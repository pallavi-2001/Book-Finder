# 📚 Book Finder App
Created with CodeSandbox

A simple and powerful **React-based web app** that allows users to search for books using the **Open Library API**, filter results by multiple criteria, and explore reading suggestions based on their **occupation** or interests.

---

## 🚀 Live Demo
👉 *(https://codesandbox.io/p/github/pallavi-2001/Book-Finder/main?import=true)*  

---

## 🧠 Features

### 🔍 Search
- Search books by **title** using the [Open Library API](https://openlibrary.org/developers/api).
- Displays book covers, authors, publishers, languages, and publication year.

### 🎯 Filters
- Filter results by:
  - Author name
  - Publisher
  - Language (English, French, Spanish, etc.)
  - Subject / genre
  - Minimum number of editions
  - Year range (From / To)
- Sort results by:
  - Title (A–Z)
  - Newest First
  - Most Editions

### 💼 Occupation-based Suggestions
Users can select their occupation and get curated topic suggestions:
- **College Student** → Programming, Study Skills, Career Development, etc.  
- **Home Worker** → Cooking, Gardening, Parenting, etc.  
- **Outdoor Enthusiast** → Travel, Adventure, Wildlife, etc.  
- **Busy Professional** → Time Management, Leadership, Mindfulness, etc.

### 🧹 Additional Features
- Clear all filters in one click.
- Displays helpful messages for search status, errors, or empty results.
- Responsive grid layout with book cards.

---

## 🛠️ Tech Stack

- **React.js (useState hooks)**
- **Axios / Fetch API**
- **Open Library API**
- **CSS** for styling (in `styles.css`)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/book-finder-react.git
cd book-finder-react
