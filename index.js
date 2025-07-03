

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

// Enhanced PDF download function using jsPDF
async function downloadResumeAsPDF() {
  // Check if jsPDF is available, if not load it dynamically
  if (typeof window.jsPDF === 'undefined') {
    try {
      // Load jsPDF from CDN
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      document.head.appendChild(script);
      
      // Wait for script to load
      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
      });
    } catch (error) {
      showNotification('Failed to load PDF library. Please try again.', 'error');
      return;
    }
  }

  try {
    showNotification('Generating PDF... Please wait.', 'success');
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Set font and colors
    doc.setFont('helvetica');
    
    let yPosition = 15;
    const leftMargin = 20;
    const rightMargin = 190;
    const lineHeight = 5.5;
    
    // Helper function to add text with line breaks
    function addText(text, x, y, options = {}) {
      const fontSize = options.fontSize || 10;
      const maxWidth = options.maxWidth || (rightMargin - x);
      const isBold = options.bold || false;
      
      doc.setFontSize(fontSize);
      if (isBold) {
        doc.setFont('helvetica', 'bold');
      } else {
        doc.setFont('helvetica', 'normal');
      }
      
      const lines = doc.splitTextToSize(text, maxWidth);
      lines.forEach((line, index) => {
        doc.text(line, x, y + (index * lineHeight));
      });
      
      return y + (lines.length * lineHeight);
    }
    
    // Header
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('KAVIYA M', 105, yPosition, { align: 'center' });
    yPosition += 7;
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('Full Stack Developer | AI/ML Enthusiast | Cloud Data Engineer', 105, yPosition, { align: 'center' });
    yPosition += 8;
    
    doc.setFontSize(9);
    doc.text('Email: mkaviya1701@gmail.com | Phone: +91 6381780483', 105, yPosition, { align: 'center' });
    yPosition += 4;
    doc.text('GitHub: github.com/kavyaaa1701 | LinkedIn: linkedin.com/in/mkavya10100', 105, yPosition, { align: 'center' });
    yPosition += 10;
    
    // Add line
    doc.setLineWidth(0.5);
    doc.line(leftMargin, yPosition, rightMargin, yPosition);
    yPosition += 7;
    
    // Objective
    yPosition = addText('OBJECTIVE', leftMargin, yPosition, { fontSize: 11, bold: true });
    yPosition += 2;
    yPosition = addText('A passionate and skilled Full Stack Developer with expertise in AI/ML, cloud computing, and data engineering. Seeking to leverage my technical skills, academic achievements, and innovative mindset to contribute to cutting-edge technology projects while continuously learning and growing in the field.', leftMargin, yPosition, { fontSize: 9 });
    yPosition += 6;
    
    // Education
    yPosition = addText('EDUCATION', leftMargin, yPosition, { fontSize: 11, bold: true });
    yPosition += 2;
    yPosition = addText('Master of Computer Applications (MCA) | 2023-2025', leftMargin, yPosition, { bold: true, fontSize: 9 });
    yPosition = addText('College of Engineering, Anna University, Chennai - Graduated: May 2025', leftMargin, yPosition, { fontSize: 9 });
    yPosition += 2;
    yPosition = addText('Bachelor of Computer Applications (BCA) | 2020-2023', leftMargin, yPosition, { bold: true, fontSize: 9 });
    yPosition = addText('Gold Medalist - Highest Academic Performance', leftMargin, yPosition, { fontSize: 9 });
    yPosition += 6;
    
    // Technical Skills
    yPosition = addText('TECHNICAL SKILLS', leftMargin, yPosition, { fontSize: 11, bold: true });
    yPosition += 2;
    yPosition = addText('Programming: Python, Java, JavaScript, HTML5, CSS3, SQL', leftMargin, yPosition, { fontSize: 9 });
    yPosition = addText('Frameworks: React.js, Flask, PyTorch, Tailwind CSS, Bootstrap, TensorFlow', leftMargin, yPosition, { fontSize: 9 });
    yPosition = addText('Cloud & Databases: AWS (S3, Glue, Athena, QuickSight), Docker, MongoDB, MySQL', leftMargin, yPosition, { fontSize: 9 });
    yPosition = addText('Tools: Git, GitHub, Android Studio, VS Code, Vercel, Linux, Jupyter Notebook', leftMargin, yPosition, { fontSize: 9 });
    yPosition += 6;
    
    // Projects (more concise)
    yPosition = addText('KEY PROJECTS', leftMargin, yPosition, { fontSize: 11, bold: true });
    yPosition += 2;
    
    const projects = [
      {
        title: 'Ex-Army Helpline Website',
        desc: 'Comprehensive support platform with modern responsive design and integrated contact forms.',
        tech: 'React.js, Tailwind CSS, Web3 Forms, Vercel'
      },
      {
        title: 'AI-Based Acne Detection & Network Security',
        desc: 'Advanced AI system combining computer vision for acne detection with network security analysis.',
        tech: 'Flask, ResNet50, Attack Trees, Python, OpenCV'
      },
      {
        title: 'Spotify-Inspired Data Engineering Pipeline',
        desc: 'Complete ETL pipeline for music data processing and analytics dashboard.',
        tech: 'AWS S3, Glue, Athena, PySpark, QuickSight'
      },
      {
        title: 'MCA Rank List Analysis & USAFE Emergency App',
        desc: 'Big data analysis using Apache Spark & Android emergency response application.',
        tech: 'Apache Spark, Docker, Java, Android Studio, Google Maps API'
      }
    ];
    
    projects.forEach(project => {
      // Check if we need a new page - allow more content on first page
      if (yPosition > 260) {
        doc.addPage();
        yPosition = 20;
      }
      yPosition = addText(project.title, leftMargin, yPosition, { bold: true, fontSize: 9 });
      yPosition = addText(project.desc, leftMargin, yPosition, { fontSize: 8 });
      yPosition = addText(`Tech: ${project.tech}`, leftMargin, yPosition, { fontSize: 8 });
      yPosition += 3;
    });
    
    // Only add new page if we haven't already for projects
    if (yPosition <= 260) {
      doc.addPage();
      yPosition = 20;
    }
    
    // Certifications
    yPosition = addText('CERTIFICATIONS', leftMargin, yPosition, { fontSize: 11, bold: true });
    yPosition += 2;
    const certifications = [
      'Python for Data Science - NPTEL (2023)',
      'Flask Framework Development - EduYear (2023)', 
      'Certified Full-Stack Developer - Revamp Academy (2024)',
      'Ethical Hacking Fundamentals - Cappriosec Securities (2023)',
      'Data Engineering Basics - EduYear (2024)'
    ];
    
    certifications.forEach(cert => {
      yPosition = addText(`• ${cert}`, leftMargin, yPosition, { fontSize: 9 });
    });
    yPosition += 6;
    
    // Achievements
    yPosition = addText('ACHIEVEMENTS & AWARDS', leftMargin, yPosition, { fontSize: 11, bold: true });
    yPosition += 2;
    const achievements = [
      'Academic Excellence: BCA Gold Medalist with highest GPA',
      'Chess Championships: 1st Place (2022), 2nd Place (2023) in tournaments',
      'Creative Arts: 1st Prize winner in hairdressing and modeling competitions',
      'Project Leadership: Led Project Nexus mentorship program for junior students',
      'Language Learning: Active Duolingo user with 365+ day learning streak'
    ];
    
    achievements.forEach(achievement => {
      yPosition = addText(`• ${achievement}`, leftMargin, yPosition, { fontSize: 9 });
    });
    yPosition += 6;
    
    // Extracurricular Activities
    yPosition = addText('EXTRACURRICULAR ACTIVITIES', leftMargin, yPosition, { fontSize: 11, bold: true });
    yPosition += 2;
    yPosition = addText('• Active participant in competitive programming contests and hackathons', leftMargin, yPosition, { fontSize: 9 });
    yPosition = addText('• Photography enthusiast and regular contributor to open source projects', leftMargin, yPosition, { fontSize: 9 });
    yPosition = addText('• Mentor for junior students in technical project development', leftMargin, yPosition, { fontSize: 9 });
    yPosition += 6;
    
    // Interests (more compact)
    yPosition = addText('INTERESTS', leftMargin, yPosition, { fontSize: 11, bold: true });
    yPosition += 2;
    yPosition = addText('Artificial Intelligence, Machine Learning, Cloud Computing, Data Science, Web Development, Mobile App Development, Cybersecurity, Chess, Photography, Creative Arts, Language Learning, Open Source Contribution', leftMargin, yPosition, { fontSize: 9 });
    
    // Save the PDF
    doc.save('Kaviya_M_Resume.pdf');
    showNotification('Resume PDF downloaded successfully!', 'success');
    
  } catch (error) {
    console.error('PDF generation error:', error);
    showNotification('Error generating PDF. Please try again.', 'error');
  }
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
