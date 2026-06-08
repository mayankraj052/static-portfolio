document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", () => {
            mobileMenuBtn.classList.toggle("active");
            mobileMenu.classList.toggle("active");
        });

        // Close menu when clicking on any mobile nav links
        const mobileLinks = mobileMenu.querySelectorAll("a");
        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                mobileMenuBtn.classList.remove("active");
                mobileMenu.classList.remove("active");
            });
        });
    }

    // 2. Matrix Rain Background Effect
    const canvas = document.getElementById("matrixBg");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const columns = Math.floor(width / 20) + 1;
        const yPositions = Array(columns).fill(0);

        function matrixRain() {
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = "#00ff41";
            ctx.font = "15px monospace";

            yPositions.forEach((y, index) => {
                // Generate random ASCII characters (letters, numbers, symbols)
                const text = String.fromCharCode(33 + Math.floor(Math.random() * 93));
                const x = index * 20;
                ctx.fillText(text, x, y);

                if (y > 100 + Math.random() * 10000) {
                    yPositions[index] = 0;
                } else {
                    yPositions[index] = y + 20;
                }
            });
        }

        const intervalId = setInterval(matrixRain, 40);

        window.addEventListener("resize", () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });
    }

    // 3. Interactive Terminal Component
    const terminalInput = document.getElementById("terminal-input");
    const terminalOutput = document.getElementById("terminal-output");

    if (terminalInput && terminalOutput) {
        const commands = {
            help: `Available commands:<br>
            - <span style="color:#0ff;">about</span>: Professional summary<br>
            - <span style="color:#0ff;">skills</span>: Technical skills inventory<br>
            - <span style="color:#0ff;">experience</span>: Internship history<br>
            - <span style="color:#0ff;">projects</span>: Featured projects<br>
            - <span style="color:#0ff;">education</span>: Academic profile<br>
            - <span style="color:#0ff;">certificates</span>: Official certifications<br>
            - <span style="color:#0ff;">achievements</span>: Key achievements<br>
            - <span style="color:#0ff;">contact</span>: Get in touch<br>
            - <span style="color:#0ff;">clear</span>: Clear console history`,

            about: `<b>Mayank Raj - Professional Summary:</b><br>
            Detail-oriented Computer Science undergraduate (CGPA: 8.9) with strong technical foundations in Linux/Windows administration, cloud platforms (AWS, Azure), networking, and application deployment. Seeking an IT Support / Technical Support Engineer or Machine Learning Engineer role to apply infrastructure, model deployment, and troubleshooting skills in a help-desk, systems, or ML environment.`,

            skills: `<b>Technical Skills Matrix:</b><br><br>
            🖥️ <b>Operating Systems:</b> Linux (Ubuntu), Windows, Bash / PowerShell scripting<br>
            🌐 <b>Networking:</b> Nginx (reverse proxy, load balancing), DNS configuration, HTTP/HTTPS, REST APIs, TCP/IP fundamentals<br>
            ☁️ <b>Cloud Platforms:</b> AWS (EC2, S3), Microsoft Azure (instance configuration, storage, access control)<br>
            🛠️ <b>DevOps & Tools:</b> Docker, Git, GitHub, CI/CD pipelines, SSH, environment configuration<br>
            🗄️ <b>Databases:</b> PostgreSQL, MySQL (installation, querying, basic administration), Prisma, Supabase<br>
            💻 <b>Programming:</b> Python, JavaScript, SQL, HTML, CSS (for scripting, automation, and system diagnostics)`,

            experience: `<b>Work Experience:</b><br><br>
            🏢 <b>Provis Technologies Private Limited</b> (Jaipur, India)<br>
            <i>Full Stack Developer Intern | Oct 2025 - Dec 2025</i><br>
            - Configured and managed Nginx reverse proxy on Microsoft Azure for production request routing.<br>
            - Containerised a multi-service application using Docker to resolve environment inconsistencies.<br>
            - Maintained PostgreSQL database with secure access controls and JWT authentication.<br>
            - Debugged and resolved application-level issues, API failures, and server misconfigurations.<br><br>
            🏢 <b>EduSkills Foundation</b> (Remote)<br>
            <i>AI-ML Intern | Jul 2024 - Sep 2024</i><br>
            - Managed and processed large datasets (10,000+ images) using Python scripts.<br>
            - Diagnosed and resolved model performance issues, reducing error rates by 25%.<br>
            - Worked in remote teams using collaborative platforms and maintained clear documentation.`,

            projects: `<b>Relevant Projects:</b><br><br>
            🚀 <b>TalentWay – Interview Platform</b> (Next.js, TypeScript, Convex, Clerk, Stream SDK, WASM)<br>
            - Deployed and maintained a multi-service interview platform with real-time video and in-browser execution.<br>
            - Handled Clerk access controls and debugged WebAssembly compiler runtimes.<br><br>
            💰 <b>AI-Powered Finance Management System</b> (Next.js, Supabase, Prisma, Gemini AI, Inngest, Resend)<br>
            - Structured PostgreSQL schema migrations via Prisma. Configured Inngest automated workflows and Resend API.<br><br>
            🩺 <b>Diabetes Prediction System</b> (Python, Scikit-Learn, Flask, Pandas)<br>
            - Implemented Logistic Regression and Decision Tree classification model for diabetes risk assessment.<br><br>
            📞 <b>Real-Time Video Call App</b> (React, WebRTC, WebSocket, JavaScript)<br>
            - Built a peer-to-peer audio-video conferencing system supporting 50+ concurrent users.<br><br>
            🔍 <b>Spam Detection App</b> (Streamlit, Scikit-Learn, Pandas, Numpy, Joblib)<br>
            - Developed and deployed an ML-powered SMS/email spam classifier on Streamlit Cloud using scikit-learn and joblib.`,

            education: `<b>Education Log:</b><br><br>
            🎓 <b>B.Tech in Computer Science and Engineering</b> (CGPA: 8.9)<br>
            University of Engineering and Management, Jaipur | Jul 2022 - May 2026 (Expected)<br><br>
            🏫 <b>Class XII (Intermediate)</b> (72%)<br>
            Bihar School Examination Board, Bhagalpur | May 2020 - Feb 2022<br><br>
            🏫 <b>Class X (Matriculation)</b> (82.3%)<br>
            Bihar School Examination Board, Bhagalpur | Mar 2019 - Feb 2020`,

            certificates: `<b>Certifications & Credentials:</b><br>
            - 🏅 Database Management System (NPTEL, IIT Kharagpur) - Top 5% Nationwide<br>
            - 🏅 AWS Cloud Technical Essentials (Coursera, Amazon Web Services)<br>
            - 🏅 Python Programming (NPTEL, IIT Madras)<br>
            - 🏅 Data Science (NPTEL, IIT Kharagpur)<br>
            - 🏅 Data Structures and Algorithms (Infosys Springboard)`,

            achievements: `<b>Achievements & Research:</b><br>
            - 🏆 Ranked in the Top 5% of learners in NPTEL Database Management Systems course.<br>
            - 📝 Published a research paper on Machine Learning in the <i>International Journal of Information Engineering and Electronic Business</i> (2026, 2, 192-204). Published Online on April 8, 2026 by MECS Press. DOI: <a href="https://doi.org/10.5815/ijieeb.2026.02.12" target="_blank" style="color:#0ff;">10.5815/ijieeb.2026.02.12</a>`,

            contact: `<b>Contact Channels:</b><br>
            - 📧 <a href="mailto:mayankrajsingh7646@gmail.com" style="color:#0ff;">mayankrajsingh7646@gmail.com</a><br>
            - 📱 +91 7646004946<br>
            - 💻 <a href="https://github.com/mayankraj052" target="_blank" style="color:#0ff;">github.com/mayankraj052</a><br>
            - 🔗 <a href="https://linkedin.com/in/mayankraj052" target="_blank" style="color:#0ff;">linkedin.com/in/mayankraj052</a><br>
            - 📍 Jaipur, Rajasthan`
        };

        const prompt = `<span style="color:#0f0;">mayank@portfolio:~$</span>`;

        terminalInput.focus();

        terminalInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const input = terminalInput.value.trim();
                const lowerInput = input.toLowerCase();

                terminalOutput.innerHTML += `<div>${prompt} ${input}</div>`;

                if (lowerInput === "clear") {
                    terminalOutput.innerHTML = `
                        <div>Welcome to Mayank's Terminal 🖥️</div>
                        <div>Type <span style="color:#0ff;">help</span> to see available commands</div>
                        <div>You can also calculate things like <span style="color:#0ff;">5 * (3 + 2)</span> or type <span style="color:#0ff;">projects</span> to view my work</div>
                    `;
                } else if (commands[lowerInput]) {
                    terminalOutput.innerHTML += `<div>${commands[lowerInput]}</div>`;
                } else if (/^[0-9+\-*/%. ()]+$/.test(input)) {
                    try {
                        const result = Function(`return (${input})`)();
                        terminalOutput.innerHTML += `<div>= ${result}</div>`;
                    } catch {
                        terminalOutput.innerHTML += `<div style="color:red;">⚠️ Invalid math expression</div>`;
                    }
                } else {
                    terminalOutput.innerHTML += `<div style="color:red;">❌ Unknown command: <b>${input}</b><br>Type <span style="color:#0ff;">help</span> to see available commands</div>`;
                }

                terminalInput.value = "";
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }
        });

        // Ensure clicking the terminal container focuses the input
        const terminalWindow = document.querySelector(".terminal-window");
        if (terminalWindow) {
            terminalWindow.addEventListener("click", () => {
                terminalInput.focus();
            });
        }
    }
});
