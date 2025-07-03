
// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 2px 20px rgba(107, 70, 193, 0.1)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = 'none';
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections for scroll animations
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(section);
});

// Observe cards for staggered animations
document.querySelectorAll('.project-card, .achievement-card, .skill-category').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
  observer.observe(card);
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  
  // Simple form validation
  if (!name || !email || !message) {
    showNotification('Please fill in all fields.', 'error');
    return;
  }
  
  if (!isValidEmail(email)) {
    showNotification('Please enter a valid email address.', 'error');
    return;
  }
  
  // Simulate form submission
  showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
  this.reset();
});

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    color: white;
    font-weight: 500;
    z-index: 10000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    max-width: 300px;
    ${type === 'success' ? 'background: linear-gradient(135deg, #10b981, #059669);' : 'background: linear-gradient(135deg, #ef4444, #dc2626);'}
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
}

// Resume download function (legacy text version)
function downloadResume() {
  downloadResumeAsPDF();
}

// Enhanced PDF download function
function downloadResumeAsPDF() {
  // Create the complete resume content as text with proper formatting
  const resumeContent = `
KAVIYA M
Full Stack Developer | AI/ML Enthusiast | Cloud Data Engineer

Email: mkaviya1701@gmail.com | Phone: +91 6381780483
GitHub: github.com/kavyaaa1701 | LinkedIn: linkedin.com/in/mkavya10100

OBJECTIVE
A passionate and skilled Full Stack Developer with expertise in AI/ML, cloud computing, and data engineering. Seeking to leverage my technical skills, academic achievements, and innovative mindset to contribute to cutting-edge technology projects while continuously learning and growing in the field.

EDUCATION
Master of Computer Applications (MCA) | 2023-2025
College of Engineering, Anna University, Chennai
Graduated: May 2025

Bachelor of Computer Applications (BCA) | 2020-2023
Gold Medalist - Highest Academic Performance
Relevant Coursework: Data Structures, Algorithms, Database Management, Web Development

TECHNICAL SKILLS
Programming Languages: Python, Java, JavaScript, HTML5, CSS3, SQL
Frameworks & Libraries: React.js, Flask, PyTorch, Tailwind CSS, Bootstrap, TensorFlow
Cloud Technologies: AWS (S3, Glue, Athena, QuickSight), Docker
Databases: MongoDB, MySQL, PostgreSQL
Tools & Platforms: Git, GitHub, Android Studio, VS Code, Vercel, Linux, Jupyter Notebook
Other Skills: Machine Learning, Data Analysis, RESTful APIs, Responsive Web Design

PROJECTS
Ex-Army Helpline Website
- Developed a comprehensive support platform for ex-army personnel with modern responsive design and integrated contact forms
- Technologies: React.js, Tailwind CSS, Web3 Forms, Vercel

AI-Based Acne Detection & Network Security Analysis
- Built an advanced AI system combining computer vision for acne detection with network security vulnerability analysis
- Technologies: Flask, ResNet50, Attack Trees, Python, OpenCV

Spotify-Inspired Data Engineering Pipeline
- Designed and implemented a complete ETL pipeline for music data processing and analytics dashboard
- Technologies: AWS S3, Glue, Athena, PySpark, QuickSight

MCA Rank List Analysis Using Big Data
- Performed comprehensive analysis of MCA admission rankings using big data processing techniques
- Technologies: Apache Spark, Docker, Python, Data Visualization

USAFE Emergency Response Mobile App
- Developed Android emergency response application with real-time location tracking and emergency contact features
- Technologies: Java, Android Studio, Google Maps API, Firebase

CERTIFICATIONS
• Python for Data Science - NPTEL (2023)
• Flask Framework Development - EduYear (2023)
• Certified Full-Stack Developer - Revamp Academy (2024)
• Ethical Hacking Fundamentals - Cappriosec Securities (2023)
• Data Engineering Basics - EduYear (2024)

ACHIEVEMENTS & AWARDS
• Academic Excellence: BCA Gold Medalist with highest GPA in the program
• Chess Championships: 1st Place (2022), 2nd Place (2023) in inter-college tournaments
• Creative Arts: 1st Prize winner in hairdressing and modeling competitions
• Project Leadership: Led Project Nexus mentorship program for junior students
• Language Learning: Active Duolingo user with 365+ day learning streak

EXTRACURRICULAR ACTIVITIES
• Active participant in competitive programming contests and hackathons
• Photography enthusiast with focus on technical and creative composition
• Regular contributor to open source projects on GitHub
• Mentor for junior students in technical project development
• Chess player with tournament experience and strategic thinking skills

INTERESTS
Artificial Intelligence, Machine Learning, Cloud Computing, Data Science, Web Development, Mobile App Development, Cybersecurity, Chess, Photography, Creative Arts, Language Learning, Open Source Contribution
`;

  // Create HTML content for PDF
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Kaviya M - Resume</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: Arial, sans-serif; 
      line-height: 1.6; 
      color: #333; 
      max-width: 210mm; 
      margin: 0 auto; 
      padding: 15mm;
      background: white;
      font-size: 11px;
    }
    h1 { 
      font-size: 24px; 
      text-align: center; 
      margin-bottom: 5px; 
      color: #1e293b;
      font-weight: 700;
    }
    .subtitle { 
      font-size: 14px; 
      text-align: center; 
      color: #1e40af; 
      margin-bottom: 10px;
      font-weight: 600;
    }
    .contact { 
      text-align: center; 
      margin-bottom: 20px; 
      font-size: 10px; 
      color: #666;
      border-bottom: 1px solid #ccc;
      padding-bottom: 10px;
    }
    .section { 
      margin-bottom: 15px; 
      page-break-inside: avoid;
    }
    .section-title { 
      font-size: 12px; 
      font-weight: 700; 
      color: #1e293b; 
      border-bottom: 1px solid #ccc; 
      padding-bottom: 2px; 
      margin-bottom: 8px;
      text-transform: uppercase;
    }
    .content { 
      font-size: 11px; 
      color: #555; 
      line-height: 1.5;
    }
    .project { 
      margin-bottom: 10px; 
      padding-bottom: 5px;
    }
    .project-title { 
      font-weight: 600; 
      color: #1e293b; 
      margin-bottom: 2px;
    }
    .project-desc { 
      color: #666; 
      margin-bottom: 2px;
      font-size: 10px;
    }
    .tech { 
      color: #1e40af; 
      font-style: italic; 
      font-size: 9px;
    }
    ul { 
      margin-left: 15px; 
      margin-bottom: 10px;
    }
    li { 
      margin-bottom: 3px; 
      font-size: 10px;
    }
    strong { 
      color: #1e293b; 
      font-weight: 600;
    }
    @page { 
      margin: 15mm; 
      size: A4;
    }
    @media print {
      body { margin: 0; padding: 10mm; }
      .section { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <h1>KAVIYA M</h1>
  <div class="subtitle">Full Stack Developer | AI/ML Enthusiast | Cloud Data Engineer</div>
  <div class="contact">
    Email: mkaviya1701@gmail.com | Phone: +91 6381780483<br>
    GitHub: github.com/kavyaaa1701 | LinkedIn: linkedin.com/in/mkavya10100
  </div>

  <div class="section">
    <div class="section-title">OBJECTIVE</div>
    <div class="content">
      A passionate and skilled Full Stack Developer with expertise in AI/ML, cloud computing, and data engineering. Seeking to leverage my technical skills, academic achievements, and innovative mindset to contribute to cutting-edge technology projects while continuously learning and growing in the field.
    </div>
  </div>

  <div class="section">
    <div class="section-title">EDUCATION</div>
    <div class="content">
      <strong>Master of Computer Applications (MCA)</strong> | 2023-2025<br>
      College of Engineering, Anna University, Chennai<br>
      Graduated: May 2025<br><br>
      
      <strong>Bachelor of Computer Applications (BCA)</strong> | 2020-2023<br>
      Gold Medalist - Highest Academic Performance<br>
      Relevant Coursework: Data Structures, Algorithms, Database Management, Web Development
    </div>
  </div>

  <div class="section">
    <div class="section-title">TECHNICAL SKILLS</div>
    <div class="content">
      <strong>Programming Languages:</strong> Python, Java, JavaScript, HTML5, CSS3, SQL<br>
      <strong>Frameworks & Libraries:</strong> React.js, Flask, PyTorch, Tailwind CSS, Bootstrap, TensorFlow<br>
      <strong>Cloud Technologies:</strong> AWS (S3, Glue, Athena, QuickSight), Docker<br>
      <strong>Databases:</strong> MongoDB, MySQL, PostgreSQL<br>
      <strong>Tools & Platforms:</strong> Git, GitHub, Android Studio, VS Code, Vercel, Linux, Jupyter Notebook<br>
      <strong>Other Skills:</strong> Machine Learning, Data Analysis, RESTful APIs, Responsive Web Design
    </div>
  </div>

  <div class="section">
    <div class="section-title">PROJECTS</div>
    <div class="content">
      <div class="project">
        <div class="project-title">Ex-Army Helpline Website</div>
        <div class="project-desc">Developed a comprehensive support platform for ex-army personnel with modern responsive design and integrated contact forms</div>
        <div class="tech">Technologies: React.js, Tailwind CSS, Web3 Forms, Vercel</div>
      </div>

      <div class="project">
        <div class="project-title">AI-Based Acne Detection & Network Security Analysis</div>
        <div class="project-desc">Built an advanced AI system combining computer vision for acne detection with network security vulnerability analysis</div>
        <div class="tech">Technologies: Flask, ResNet50, Attack Trees, Python, OpenCV</div>
      </div>

      <div class="project">
        <div class="project-title">Spotify-Inspired Data Engineering Pipeline</div>
        <div class="project-desc">Designed and implemented a complete ETL pipeline for music data processing and analytics dashboard</div>
        <div class="tech">Technologies: AWS S3, Glue, Athena, PySpark, QuickSight</div>
      </div>

      <div class="project">
        <div class="project-title">MCA Rank List Analysis Using Big Data</div>
        <div class="project-desc">Performed comprehensive analysis of MCA admission rankings using big data processing techniques</div>
        <div class="tech">Technologies: Apache Spark, Docker, Python, Data Visualization</div>
      </div>

      <div class="project">
        <div class="project-title">USAFE Emergency Response Mobile App</div>
        <div class="project-desc">Developed Android emergency response application with real-time location tracking and emergency contact features</div>
        <div class="tech">Technologies: Java, Android Studio, Google Maps API, Firebase</div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">CERTIFICATIONS</div>
    <div class="content">
      <ul>
        <li>Python for Data Science - NPTEL (2023)</li>
        <li>Flask Framework Development - EduYear (2023)</li>
        <li>Certified Full-Stack Developer - Revamp Academy (2024)</li>
        <li>Ethical Hacking Fundamentals - Cappriosec Securities (2023)</li>
        <li>Data Engineering Basics - EduYear (2024)</li>
      </ul>
    </div>
  </div>

  <div class="section">
    <div class="section-title">ACHIEVEMENTS & AWARDS</div>
    <div class="content">
      <ul>
        <li><strong>Academic Excellence:</strong> BCA Gold Medalist with highest GPA in the program</li>
        <li><strong>Chess Championships:</strong> 1st Place (2022), 2nd Place (2023) in inter-college tournaments</li>
        <li><strong>Creative Arts:</strong> 1st Prize winner in hairdressing and modeling competitions</li>
        <li><strong>Project Leadership:</strong> Led Project Nexus mentorship program for junior students</li>
        <li><strong>Language Learning:</strong> Active Duolingo user with 365+ day learning streak</li>
      </ul>
    </div>
  </div>

  <div class="section">
    <div class="section-title">EXTRACURRICULAR ACTIVITIES</div>
    <div class="content">
      <ul>
        <li>Active participant in competitive programming contests and hackathons</li>
        <li>Photography enthusiast with focus on technical and creative composition</li>
        <li>Regular contributor to open source projects on GitHub</li>
        <li>Mentor for junior students in technical project development</li>
        <li>Chess player with tournament experience and strategic thinking skills</li>
      </ul>
    </div>
  </div>

  <div class="section">
    <div class="section-title">INTERESTS</div>
    <div class="content">
      Artificial Intelligence, Machine Learning, Cloud Computing, Data Science, Web Development, Mobile App Development, Cybersecurity, Chess, Photography, Creative Arts, Language Learning, Open Source Contribution
    </div>
  </div>
</body>
</html>
`;

  // Create a new window with the HTML content and trigger print
  const printWindow = window.open('', '_blank');
  printWindow.document.write(htmlContent);
  printWindow.document.close();
  
  // Wait for content to load, then trigger print which will show save as PDF option
  setTimeout(() => {
    printWindow.focus();
    printWindow.print();
    
    // Show success notification
    showNotification('Resume PDF download dialog opened! Choose "Save as PDF" in the print dialog.', 'success');
    
    // Close the window after a delay
    setTimeout(() => {
      printWindow.close();
    }, 1000);
  }, 500);
}

// Print resume function
function printResume() {
  const resumeElement = document.querySelector('.resume-preview');
  const printWindow = window.open('', '_blank');
  
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Kaviya M - Resume</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: 'Arial', sans-serif; 
          line-height: 1.6; 
          color: #333; 
          max-width: 210mm; 
          margin: 0 auto; 
          padding: 20mm;
          background: white;
        }
        .resume-header { text-align: center; margin-bottom: 30px; }
        .resume-header h3 { font-size: 28px; color: #1e293b; margin-bottom: 8px; }
        .resume-header p { font-size: 16px; color: #1e40af; margin-bottom: 15px; }
        .resume-contact { 
          display: grid; 
          grid-template-columns: repeat(2, 1fr); 
          gap: 8px; 
          font-size: 12px; 
          color: #666;
        }
        .resume-section { margin-bottom: 25px; page-break-inside: avoid; }
        .resume-section h4 { 
          font-size: 16px; 
          color: #1e293b; 
          border-bottom: 1px solid #ccc; 
          padding-bottom: 5px; 
          margin-bottom: 10px; 
        }
        .resume-item { font-size: 13px; color: #555; line-height: 1.5; }
        .resume-item strong { color: #1e293b; }
        @page { margin: 15mm; }
      </style>
    </head>
    <body>
      ${resumeElement.innerHTML}
    </body>
    </html>
  `);
  
  printWindow.document.close();
  printWindow.focus();
  
  setTimeout(() => {
    printWindow.print();
  }, 250);
}

// Typing animation for hero title
function typeWriter() {
  const titles = [
    'AI/ML Enthusiast',
    'Full Stack Developer', 
    'Cloud Data Engineer',
    'BCA Gold Medalist'
  ];
  
  const heroTitle = document.querySelector('.hero-title');
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function type() {
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
      heroTitle.innerHTML = `<span class="highlight">${currentTitle.substring(0, charIndex - 1)}</span>`;
      charIndex--;
    } else {
      heroTitle.innerHTML = `<span class="highlight">${currentTitle.substring(0, charIndex + 1)}</span>`;
      charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentTitle.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typeSpeed = 500;
    }
    
    setTimeout(type, typeSpeed);
  }
  
  // Start typing animation after page load
  setTimeout(type, 1000);
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
  // Restore original title for initial load
  setTimeout(() => {
    typeWriter();
  }, 2000);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroContent = document.querySelector('.hero-content');
  const heroImage = document.querySelector('.hero-image');
  
  if (heroContent && heroImage) {
    heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
    heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
  }
});

// Skills animation on scroll
const skillItems = document.querySelectorAll('.skill-item');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'scale(1)';
      }, index * 100);
    }
  });
}, { threshold: 0.5 });

skillItems.forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'scale(0.8)';
  item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  skillObserver.observe(item);
});

// Add loading animation
window.addEventListener('load', () => {
  const loader = document.createElement('div');
  loader.innerHTML = `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #6b46c1, #8b5cf6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      transition: opacity 0.5s ease;
    ">
      <div style="
        color: white;
        font-size: 2rem;
        font-weight: 700;
        text-align: center;
      ">
        <div style="margin-bottom: 1rem;">Kaviya M</div>
        <div style="
          width: 50px;
          height: 4px;
          background: white;
          margin: 0 auto;
          border-radius: 2px;
          animation: pulse 1.5s ease-in-out infinite;
        "></div>
      </div>
    </div>
  `;
  
  document.body.appendChild(loader);
  
  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(loader);
    }, 500);
  }, 1500);
});

// Add CSS for pulse animation
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;
document.head.appendChild(style);
