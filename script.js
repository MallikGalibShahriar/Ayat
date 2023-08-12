const ayatElement = document.getElementById("ayat");
const surahElement = document.getElementById("surah");
const newAyatBtn = document.getElementById("newAyatBtn");

newAyatBtn.addEventListener("click", getAyat);

async function getAyat() {
  newAyatBtn.disabled = true;
  ayatElement.textContent = "Loading...";
  surahElement.textContent = "";

  try {
    const response = await fetch(
      "https://api.alquran.cloud/v1/ayah/" +
        Math.floor(Math.random() * 6236) +
        "/en.asad"
    );
    const data = await response.json();

    if (!data.data) {
      throw new Error("Error fetching ayat");
    }

    displayAyat(data.data);
  } catch (error) {
    ayatElement.textContent = "An error occurred";
  } finally {
    newAyatBtn.disabled = false;
  }
}

function displayAyat(ayat) {
  ayatElement.textContent = `"${ayat.text}"`;
  surahElement.textContent = `- Surah ${ayat.surah.number} (${ayat.surah.englishName})`;
}

getAyat();

newAyatBtn.addEventListener("click", openModal);

closeBtn.addEventListener("click", closeModal);

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}
