# 📚 FLIP: Intelligent E-Learning Platform with Automated Summarization & Assessments

This project implements an intelligent e-learning platform where users can upload or access e-books, read them with integrated AI-driven tools, and test their understanding through automatically generated assessments. The system leverages **NLP models** (T5, SpaCy, Sense2Vec, etc.) to provide **summarization, keyword extraction, question generation, and contextual Q&A**.

---

## 🚀 Features

### 👤 User Features
- **Authentication & Profiles**  
  - Sign up / Sign in using Firebase Authentication  
  - Reset password and update profile  
  - Users categorized as **Guest** or **Author**

- **For Guests**
  - Application tutorial on first login  
  - Upload or select an e-book (PDF) from the system library  
  - Read using integrated **E-Reader**  
  - **Page-wise AI-generated summaries**  
  - **Self-assessment quizzes** (MCQ, Fill in the blanks, One-word answers)  
  - Summarize across multiple pages  
  - Ask contextual questions for any page and get AI-generated answers  
  - Explore **top-rated e-books** scraped from online cataloguing websites  

- **For Authors**
  - Upload and publish e-books (PDF) to the **FLIP Library**  
  - Auto-generated **summaries and self-assessments** for each page  
  - Search their own published e-books  
  - Preview or modify generated summaries and questions  

---

## 🛠️ System Architecture

### 🔹 Frontend
- Built with **React.js**
- Firebase Authentication for user management
- Interactive UI for reading, uploading, and assessments

### 🔹 Backend
- **Node.js + Express** as the web server
- **MongoDB Atlas** as the cloud database with collections:
  - `Users_EBooks` → Stores uploaded e-books & their metadata  
  - `FLIP_Library` → Repository of system-wide e-books  
  - `Authorized_Authors` → Stores author user IDs  

### 🔹 AI/NLP Components
Python scripts are triggered from the backend to handle AI tasks:
1. **Summary & Self-Assessment Generation**  
   - Uses **T5 (Text-to-Text Transfer Transformer)** for text summarization  
   - SpaCy for **Named Entity Recognition** (keyword extraction)  
   - Fine-tuned T5 on **SQuAD dataset** for **question generation**  
   - Sense2Vec for generating **MCQ distractors**  
   - FlashText + Multipartite Rank for **Fill-in-the-Blank questions**

2. **Multi-Page Summarization**  
   - Summarizes concatenated content across selected pages  

3. **Contextual Q&A**  
   - Fine-tuned T5 (or DistilBERT alternative) to answer user queries in context of a specific page  

---

## 📂 API Endpoints

- **Authentication**
  - Firebase APIs for login, signup, password reset  

- **E-Books**
  - `POST /upload` → Upload e-book (user)  
  - `POST /library/upload` → Upload e-book (author, to FLIP library)  
  - `GET /ebook/:id` → Retrieve user’s uploaded e-book  
  - `PUT /library/:id` → Modify author’s published e-book  

- **AI Services**
  - `POST /summary/page` → Generate page-wise summary  
  - `POST /summary/multi` → Generate summary across pages  
  - `POST /qa/page` → Get contextual Q&A for a page  

---

## ⚙️ Tech Stack

- **Frontend:** React.js, Firebase Authentication  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB Atlas  
- **NLP Models & Libraries:**  
  - T5 (Summarization, QG, QA)  
  - DistilBART / DistilBERT (alternative models)  
  - SpaCy (NER)  
  - Sense2Vec (Distractors)  
  - FlashText + Multipartite Rank (Fill-in-the-Blanks)  

---

## 📊 Model Training

- **T5 fine-tuned on SQuAD** for Question Generation & QA  
  - ~80k rows training, 10k rows validation  
  - Batch size: 4, 1 epoch (~4 hrs on Google Colab)  
- Summarization leverages **pretrained T5-base** without extra fine-tuning  
- NER & keyword extraction handled by **SpaCy + MMR**  

---

## 🖼️ System Flow
1. User signs up and logs in  
2. Guest: Upload/read e-book → Summaries + Assessments + Q&A  
3. Author: Upload e-book → Auto-summary & assessment → Publish to library  
4. MongoDB stores and retrieves all e-books & processed data  
5. Python scripts handle summarization, Q&A, and question generation  

---

## 📌 Future Enhancements
- Improve contextual understanding with larger transformer models (e.g., T5-large, GPT models)  
- Expand question diversity using hybrid keyword extraction techniques  
- Add audio support (text-to-speech summaries) for accessibility  
- Mobile app version of the platform  

---

## 👨‍💻 Authors
Developed as part of an **Intelligent E-Learning System Project** integrating modern NLP techniques for automated summarization and self-assessment.  

The proposed system has been **published as a research paper** in the *International Journal of Advanced Computer Science and Applications (IJACSA)*:

- **Title:** State-of-the-Art Approach to e-Learning with Cutting Edge NLP Transformers: Implementing Text Summarization, Question and Distractor Generation, Question Answering  
- **Journal:** International Journal of Advanced Computer Science and Applications (IJACSA), Vol. 13, No. 1, 2022  
- **DOI:** [10.14569/IJACSA.2022.0130155](https://dx.doi.org/10.14569/IJACSA.2022.0130155)  

---

## 📂 Resources
Additional materials and resources related to this project are available here:  

- [T5 tranfomer files](https://drive.google.com/drive/folders/1nu2PMSx1mVi-RDSjuRNmD9_xh9wKgnFM?usp=sharing)
- [Sense2vec reddit 2015 files](https://github.com/explosion/sense2vec/releases/download/v1.0.0/s2v_reddit_2015_md.tar.gz)  


