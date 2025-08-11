document.addEventListener("DOMContentLoaded", () => {
    const terminalInput = document.getElementById("terminal-input");
    const terminalOutput = document.getElementById("terminal-output");

    const commands = {
        help: `Available commands:<br>
        - <span style="color:#0ff;">projects</span><br>
            - <span style="color:#0ff;">certificates</span><br>
                - <span style="color:#0ff;">contact</span><br>
                    - <span style="color:#0ff;">clear</span><br>
                        - <span style="color:#0ff;">[math expressions like 5 + 3]</span>`,

        projects: `🟢 AI-Powered Finance Management System<br>🟢 Diabetes Prediction System<br>🟢 Real-Time Video Call App`,

        certificates: `🏅 DBMS by IIT Kharagpur (Top 5%)<br>🏅 Python by IIT Madras<br>🏅 DSA by Infosys Springboard`,

        contact: `📧 mayankrajsingh7646@gmail.com<br>
                                    💻 <a href="https://github.com/mayankraj052" target="_blank" style="color:#0ff;">github.com/mayankraj052</a><br>
                                        🔗 <a href="https://linkedin.com/in/mayankraj052" target="_blank" style="color:#0ff;">linkedin.com/in/mayankraj052</a>`,
    };

    const prompt = `<span style="color:#0f0;">mayank@mayank:~$</span>`;

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
});
