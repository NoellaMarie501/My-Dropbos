# 📁 My Dropbox App  – File Upload, Download & Display App

A file management app built with **ReactJS** and **AWS Amplify** that allows users to:

- 📤 Upload files to AWS S3
- 📂 Organize files using folder paths
- 🔍 Filter, search, download, and delete files
- ✅ View uploaded files in a modern UI

---

## 🚀 Features

- **Drag-and-drop file upload**
- **Folder path support** (nested directory structure)
- **File previews** (based on type)
- **Filtering by file type** (Images, Videos, Docs, Zips)
- **Search by filename**
- **File download & delete support**
- Built using [AWS Amplify Storage](https://docs.amplify.aws/lib/storage/getting-started/q/platform/js/)

---

## 🛠️ Tech Stack

- **Frontend**: ReactJS (with Bootstrap)
- **Storage**: AWS S3 via Amplify Storage
- **State Management**: React Hooks
- **Routing**: React Router

---

## 📦 Basic Project Structure

```plaintext
my-dropbox/
├── public/
├── src/
│   ├── components/
│   │   ├── Home.jsx              
│   │   ├── FileDisplayPage.jsx    
│   │   ├── layout.jsx               
│   │   ├── auth/                    
│   │   │   ├── LoginPage.jsx
│   │   │   ├── LoginPage.css
│   │   │   ├── RegisterPage.jsx
│   │   │   └── ValidatePage.jsx
│   │   ├── common/                  
│   │   │   ├── Home.jsx
│   │   │   ├── Home.css
│   │   │   └── SiteNav.jsx
│   │   └── FileDisplayPage.jsx       
└── package.json
```


## ⚙️ Setup Instructions

### 1. 🔐 Prerequisites

- Node.js ≥ 14.x
- AWS Account with an S3 bucket configured
- Amplify CLI installed:
 ``` bash
  npm install -g @aws-amplify/cli
  ```
### 2. 📁 Clone the Repo
bash

git clone https://github.com/your-username/my-dropbox.git
cd my-dropbox
### 3. 🧩 Install Dependencies
``` bash
npm install
```
### 4. 🔗 Configure Amplify
If you haven’t already initialized Amplify:

```bash
amplify init
```
Then add storage:

``` bash
amplify add storage
```
# Follow prompts (e.g., S3 bucket with guest access)
Push to AWS:
```bash

amplify push
```
This will generate the amplifyconfiguration.json file used in the app.

5. ▶️ Run the App
``` bash
npm start
```
Navigate to: http://localhost:3000

🧪 Testing the App
Upload a file using drag-and-drop or file selector.

Specify a folder path (e.g., documents/2025) to organize files.

Go to the file display page to:

View file list

Search/filter by type

Download or delete files



📌 To-Do / Improvements
 Add preview for image files

 Add authentication (Amplify Auth)

 Support multi-file uploads

 Pagination for large file lists

 Toasts for upload/delete confirmation

🙋‍♀️ Author
Noella Kieng
Fullstack Engineer | Cloud Developer
📧 marienoelcheo@gmail.com
[🔗 LinkedIn](https://www.linkedin.com/in/mariecheo)

