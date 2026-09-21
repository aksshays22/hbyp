const SECRET_CODE = "AKSHAYKIRIDDHIMA";

const lockScreen = document.getElementById("lockScreen");
const site = document.getElementById("site");
const slots = document.getElementById("letterSlots");
const unlockBtn = document.getElementById("unlockBtn");
const errorMsg = document.getElementById("errorMsg");
const inputs = Array.from(slots.querySelectorAll("input"));

inputs.forEach((input, i) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/[^a-zA-Z]/g, "").toUpperCase();
    if (input.value && i < inputs.length - 1) inputs[i + 1].focus();
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && !input.value && i > 0) {
      inputs[i - 1].focus();
    }
    if (e.key === "Enter") unlock();
  });
});

function getCode() {
  return inputs.map(input => input.value).join("").toUpperCase();
}

function unlock() {
  const entered = getCode();

  if (entered === SECRET_CODE) {
    lockScreen.classList.add("hidden");
    site.classList.remove("hidden");
    document.body.classList.remove("locked");
    window.scrollTo({ top: 0, behavior: "instant" });
  } else {
    errorMsg.textContent =
      "Hmm... that's not quite it. Try rearranging the letters ♡";

    slots.animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(-8px)" },
        { transform: "translateX(8px)" },
        { transform: "translateX(-5px)" },
        { transform: "translateX(0)" }
      ],
      { duration: 300 }
    );
  }
}

unlockBtn.addEventListener("click", unlock);
document.body.classList.add("locked");

// Scroll buttons
document.querySelectorAll("[data-target]").forEach(btn => {
  btn.addEventListener("click", () => {
    document.getElementById(btn.dataset.target)?.scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Vinyl player
const vinyl = document.getElementById("vinyl");
const song = document.getElementById("song");

vinyl.addEventListener("click", async () => {
  try {
    if (song.paused) {
      await song.play();
      vinyl.classList.add("playing");
    } else {
      song.pause();
      vinyl.classList.remove("playing");
    }
  } catch {
    alert("Add your song as assets/song.mp3 first ♡");
  }
});

song.addEventListener("ended", () => vinyl.classList.remove("playing"));

// Envelope
const envelope = document.getElementById("envelope");
const envelopeBtn = document.querySelector(".envelope-btn");

envelopeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const isOpen = envelope.classList.toggle("open");
  envelopeBtn.textContent = isOpen ? "CLOSE MY LETTER" : "OPEN MY LETTER";
});

