document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  document.querySelector("form").onsubmit = send_email;

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  let user_email = JSON.parse(document.getElementById("user_email").textContent);
  fetch("/emails/"+mailbox)
  .then(response => response.json())
  .then(emails => {
    for (let key in emails){
      let email = emails[key];
      if (email.recipients.includes(user_email) || email.sender.includes(user_email))
        render_email(email);
    }
  })
  .catch(error => {
    document.querySelector("#message").innerHTML = error;
  });
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
}

function render_email(email) {
  let email_div = document.createElement('div');
  email_div.id = String(email.id);
  email_div.style = `margin-top: 10px; background-color: ${email.read ? "white" : "gray"}; border: 1px solid;`;
  email_div.innerHTML = `<b>${email.sender}</b>${"&nbsp;".repeat(3)} ${email.subject} <span style="float: right;">${email.timestamp}</span>`;
  email_div.addEventListener("click", (event) => view_email(event));
  document.querySelector("#emails-view").append(email_div); 
}


function send_email(event) {
  fetch("/emails", {
    method: "POST",
    body: JSON.stringify({
      recipients: document.querySelector("#compose-recipients").value,
      subject: document.querySelector("#compose-subject").value,
      body: document.querySelector("#compose-body").value
    })
  })
  .then(() => load_mailbox("sent"))
  .catch(error => {
    document.querySelector("#message").innerHTML = error
  });
}


function view_email(event) {
  email_id = event.target.id;
  fetch(`/emails/${email_id}`, {
    method: "PUT",
    body: JSON.stringify({
      read: false
    })
  })
  .catch(error => {
    document.querySelector("#message").innerHTML = error
  });

fetch('/emails/'+email_id)
.then(response => response.json())
.then(email => {
  let email_div = document.querySelector("#emails-view");
  email_div.innerHTML = "";
  let user_email = JSON.parse(document.getElementById("user_email").textContent);
  if (email.recipients.includes(user_email))
  {
    let archive_button = document.createElement("button");
    archive_button.innerHTML = email.archived ? "Remove from archive" : "Archive";

    archive_button.onclick = () => {
      archived_request(email.id, !email.archived);
      archive_button.innerHTML = archive_button.innerHTML === "Remove from archive" ? "Archive" : "Remove from archive";
    }
    
    
    let reply_button = document.createElement("button");
    reply_button.innerText = "Reply";
    reply_button.onclick = () => reply(email);
    
    email_div.append(archive_button);
    email_div.append(reply_button);
  }
  
  let titles = {
    "Sender: ": email.sender, 
    "Reciptients: ": email.recipients, 
    "Subject: ": email.subject, 
    "Timestamp: ": email.timestamp};
    for (key in titles) {
      let p_tag = document.createElement('p');
      let b_tag = document.createElement('b');
      let title = document.createTextNode(key);
      let data = document.createTextNode(titles[key]);
      b_tag.appendChild(title);
      p_tag.appendChild(b_tag);
      p_tag.appendChild(data);
      email_div.append(p_tag);
    }
    hr = document.createElement('hr');
    body = document.createTextNode(email.body);
    email_div.append(hr, body);
})
.catch(error => {
  document.querySelector("#message").innerHTML = error
});
}

function archived_request(email_id, archived_bool) {
  fetch("/emails/"+email_id, {
    method: "PUT",
    body: JSON.stringify({
      archived: archived_bool
    })
  })
  .then(() => load_mailbox("inbox"))
  .catch(error => {
    document.querySelector("#message").innerHTML = error
  });
}

function reply(email) {
  compose_email();
  document.querySelector('#compose-recipients').value = email.sender;
  document.querySelector('#compose-subject').value = email.subject.includes('re:') ? email.subject : "re: "+email.subject;
  document.querySelector('#compose-body').value = `On ${email.timestamp} ${email.sender} wrote:\n` + email.body;
}