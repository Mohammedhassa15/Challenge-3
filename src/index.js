const API_URL = "http://localhost:3000/posts";
// grab the elemnts by thier unique ids
const postList = document.getElementById("post-list");
const createForm = document.getElementById("createForm");
// this functions displays the post the user typed in
function displayPosts() {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      postList.innerHTML = "";   //the list by default is empty

      data.forEach((post) => {
        const postId = post.id;
        const postTitle = post.title || "";
        const content = post.content || "";
        const author = post.author || "Unknown Author";
        const imageUrl = post.url || "";

        const li = document.createElement("li");
        li.innerHTML = `
          <div id="post-${postId}" class="post">
            <div class="post-content">
              <h2 class="post-title" data-id="${postId}" style="cursor: pointer; color: blue;">${postTitle}</h2>
              <p class="post-hint">Click on the title to view content</p>
              <div class="hidden-content" id="content-${postId}" style="display: none;">
                <img src="${imageUrl}" 
                     alt="Post Image" 
                     style="max-width: 400px; margin: 10px 0;"/>
                <p><strong>Author:</strong> ${author}</p>
                <p><strong>Content:</strong> ${content}</p>
              </div>
            </div>
            <div class="actions">
              <button onclick="confirmEdit('${postId}')" class="editButton">
                <i class='bx bx-edit-alt'></i>
              </button>
              <button onclick="deletePost('${postId}')" class="myDeleteButton">
                <i class='bx bx-trash' style='color:#ffffff'></i>
              </button>
            </div>
          </div>
        `;
        postList.appendChild(li);  //this posts the lists to the elements
      });

      // Add click listener for post titles
      document.querySelectorAll(".post-title").forEach((titleEl) => {
        titleEl.addEventListener("click", (e) => {
          const postId = e.target.dataset.id;
          showPostDetails(postId);
        });
      });
      if (data.length > 0) {
  showPostDetails(data[0].id); // this one ensures the posts appear in the chronological order they were put in
    }

});
}

// this one shows that when the user clicks on the tittle the details of the post appera
function showPostDetails(postId) {
  const contentDiv = document.getElementById(`content-${postId}`);
  const isVisible = contentDiv.style.display === "block";
  contentDiv.style.display = isVisible ? "none" : "block";
}

// this onfirmEdit rells the user if they are sure to edit this post
function confirmEdit(postId) {
  if (confirm("Do you want to edit this post?")) {
    fetch(`${API_URL}/${postId}`)
      .then((res) => res.json())
      .then((post) => {
        showEditForm(postId, post.title, post.content, post.author, post.url);  // all the parts of the post to be edited
      });
  }
}

// this functions listens for the submit and prevents reload of page 
function addNewPostListener() {
  createForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("post-content").value;
    const author = document.getElementById("author").value;
    const url = document.getElementById("url").value;

    fetch(API_URL, {
      method: "POST",  //user makes new post to the page by using the post method
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ title, content, author, url }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Post created successfully!") // this one alerts the user that the post is created successfully
        displayPosts();
        createForm.reset();
      });
  });
}

// this is function for the edit button that enables the user to edit the content,title,author,and image
function showEditForm(postId, currentTitle, currentContent, currentAuthor, currentUrl) {
  const postDiv = document.getElementById(`post-${postId}`);
  postDiv.innerHTML = `
    <form id="editForm">
      <input type="text" id="editTitle-${postId}" value="${currentTitle}" required>
      <input type="text" id="edit-url-${postId}" value="${currentUrl || ''}" required placeholder="Image URL">
      <input type="text" id="edit-author-${postId}" value="${currentAuthor}" required>
      <textarea id="edit-content-${postId}" required>${currentContent}</textarea>
      <button type="button" onclick="saveEdit('${postId}')" class="myButton">
        <i class='bx bx-check' style='color:#ffffff'></i>
      </button> 
      <button type="button" onclick="cancelEdit('${postId}')" class="myDeleteButton">
        <i class='bx bx-x' style='color:#ffffff'></i>   
      </button> 
    </form>
  `;
}

// this function enables the user to save the edit made 
function saveEdit(postId) {
  const newTitle = document.getElementById(`editTitle-${postId}`).value;
  const newContent = document.getElementById(`edit-content-${postId}`).value;
  const newAuthor = document.getElementById(`edit-author-${postId}`).value;
  const newUrl = document.getElementById(`edit-url-${postId}`).value;

  fetch(`${API_URL}/${postId}`, {
    method: "PATCH",    // updates posts by using the patch method
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title: newTitle,
      content: newContent,
      author: newAuthor,
      url: newUrl,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Post updated successfully");
      displayPosts();
    });
}

// this function cancels the edit when the button is clicked
function cancelEdit(postId) {
  displayPosts()
}

// this function enabbles the user to delete the post and they are aksed to confirm the delete action
function deletePost(postId) {
  if (confirm("Are you sure you want to delete this post?")) {
    fetch(`${API_URL}/${postId}`, {
      method: "DELETE",  //the user can delete method to delete the post
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Post deleted successfully");
        displayPosts();    // this refreshes the post lits after deletion
      });
  }
}
// this one ensures that code only runs after the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  displayPosts();  //this one nsures that all the posts load fully on the page 
  addNewPostListener();     //this one listens and enbles user to create new posts
});
