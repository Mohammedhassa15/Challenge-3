# Challenge-3
Simple Blog
A simple CRUD(Create, Read, Update, Delete)blog post manager built with HTML, CSS, JavaScript, and JSON Server. This app allows users to create, view, update, and delete blog posts from a local REST API.

## Project Features
- Display all blog posts

- Add new posts with a form

- Edit existing posts

- Delete posts

- Click on a post to see its details/contents

- Syncs with a local API using JSON Server

## Components of the project
- HTML – Structure of the app

- CSS – Styling

- JavaScript – Logic and interactivity

- JSON Server – Mock backend API

## How to run the blog on your machine
1. Clone the repository to your local machine

2. Install json-server if not already installed
  - ***npm install -g json-server***
3. Start the JSON server
  - ***json-server --watch db.json***
  - the JSON server will run at:
  - http://localhost:3000/posts
   

  
  
5. Open the App
Open index.html in your browser (you can double-click it or use Live Server in VS Code).

## How to use the app
- Fill in the Title, Content, and Author fields and click Create.

- Posts will appear below the form.

- Each post has Edit and Delete buttons.

- You can update the post content or remove it.
  
- Click on the title to see the content and details

## Sample of the project
```
{
  "id": 1,
  "title": "My First Post",
  "content": "This is the content of my first blog post.",
  "author": "Mohammed",
  "url": "https://example.com/my-image.jpg"
}
```

## You can view the website at this link
 https://mohammedhassa15.github.io/Challenge-3/


