document.getElementById('file').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const filePreview = document.getElementById('filePreview');

    filePreview.innerHTML = ''; // Clear previous preview content

    if (file) {
        const fileReader = new FileReader();

        fileReader.onload = function(e) {
            const fileType = file.type.split("/")[0];

            if (fileType === "image") {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = "Image Preview";
                img.style.maxWidth = "100%";
                filePreview.appendChild(img);
            } else if (fileType === "video") {
                const video = document.createElement('video');
                video.src = e.target.result;
                video.controls = true;
                video.style.maxWidth = "100%";
                filePreview.appendChild(video);
            } else if (fileType === "audio") {
                const audio = document.createElement('audio');
                audio.src = e.target.result;
                audio.controls = true;
                filePreview.appendChild(audio);
            } else {
                const p = document.createElement('p');
                p.textContent = "File preview not supported for this type.";
                filePreview.appendChild(p);
            }
        };

        fileReader.readAsDataURL(file); // Read the file and generate a preview
    }
});

// Event listener for form submission
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const n = document.getElementById("name").value,
        o = document.getElementById("bookName").value,
        s = document.getElementById("message").value,
        a = document.getElementById("file").files[0],
        t = "6057603206:AAFbV3fKQaZsi8De-4AJOSklajb2syCugMQ",
        c = "5262525993",
        f = new FormData;
    f.append("chat_id", c);
    const p = `Name: ${n}\nBook Name: ${o}\nMessage: ${s}`;
    if (a) {
        const e = a.type.split("/")[0];
        "image" === e ? (f.append("photo", a), f.append("caption", p), await u(`https://api.telegram.org/bot${t}/sendPhoto`, f)) : "audio" === e ? (f.append("audio", a), f.append("caption", p), await u(`https://api.telegram.org/bot${t}/sendAudio`, f)) : "video" === e ? (f.append("video", a), f.append("caption", p), await u(`https://api.telegram.org/bot${t}/sendVideo`, f)) : (f.append("document", a), f.append("caption", p), await u(`https://api.telegram.org/bot${t}/sendDocument`, f))
    } else f.append("text", p), await u(`https://api.telegram.org/bot${t}/sendMessage`, f)
});

// Function to send data to Telegram
async function u(e, f) {
    try {
        const o = await fetch(e, {
            method: "POST",
            body: f
        });
        const a = await o.json();

        if (a.ok) {
            alert("Message sent successfully to Telegram!");
        } else {
            console.error("Error sending message to Telegram:", a);
            alert("Failed to send message to Telegram.");
        }
    } catch (e) {
        console.error("Fetch error:", e);
        alert("An error occurred while sending the message.");
    }
}
