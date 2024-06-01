let makananAcak;
let kategori = [];
let makananKategori;

// 4. Buatlah sebuah fungsi yang memanggil API untuk mendapatkan makanan acak
async function getMakananAcak() {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await response.json();
        makananAcak = data.meals[0];
        console.log('Makanan Acak:', makananAcak);
//    - Tampilkan makanan acak tersebut ke dalam DOM
        const resultElement = document.getElementById('result');
        resultElement.innerHTML = `
        <div class="card border rounded-4 border-2 border-black" style="width: 70%">
        <img src="${makananAcak.strMealThumb}" alt="${makananAcak.strMeal}" class="card-img-top rounded-top-4">
            <div class="card-body">
            <h3 class="py-3 card-title d-flex justify-content-center">${makananAcak.strMeal}</h3>
            </div>
        </div>
        `;
    } catch (error) {
    console.error('Error fetching makanan acak:', error);
    }
}

// 5. Buatlah sebuah fungsi yang memanggil API untuk mendapatkan kategori makanan
async function getKategori() {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const data = await response.json();
        kategori = data.categories;
        console.log('Kategori:', kategori);
//    - Tampilkan kategori tersebut ke dalam DOM
        const selectElement = document.getElementById('kategori');
        kategori.forEach((item) => {
            const option = document.createElement('option');
            option.value = item.strCategory;
            option.text = item.strCategory;
            selectElement.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching kategori:', error);
    }
}

// 6. Buatlah sebuah fungsi yang memanggil API untuk mendapatkan makanan berdasarkan kategori
async function getMakananByKategori(selectedKategori) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedKategori}`);
        const data = await response.json();
        makananKategori = data.meals;
        console.log(`Makanan dalam kategori ${selectedKategori}:`, makananKategori);
//    - Tampilkan makanan tersebut ke dalam DOM
        const listElement = document.getElementById('makanan-list');
        listElement.innerHTML = '';

        // Menyusun makanan secara rapi, tiga item per baris
    for (let i = 0; i < makananKategori.length; i++) {
      if (i % 3 === 0) {
        const row = document.createElement('div');
        row.classList.add('row');
        listElement.appendChild(row);
      }

      const col = document.createElement('div');
      col.classList.add('col-md-4', 'mb-4');

      const makanan = makananKategori[i];

      col.innerHTML = `
        <div class="card border border-1 border-black">
          <img src="${makanan.strMealThumb}" alt="${makanan.strMeal}" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title d-flex justify-content-center">${makanan.strMeal}</h5>
          </div>
        </div>
      `;

      const currentRow = listElement.lastChild;
      currentRow.appendChild(col);
    }
  } catch (error) {
    console.error(`Error fetching makanan kategori ${selectedKategori}:`, error);
  }
}

// 7. Buatlah sebuah event listener ketika <button> "Makanan Acak" diklik
document.getElementById('btnMakananAcak').addEventListener('click', getMakananAcak);

// 8. Buatlah sebuah event listener ketika <select> "Kategori" berubah
document.addEventListener('DOMContentLoaded', getKategori);
document.getElementById('kategori').value = 'Beef';
getMakananByKategori('Beef');
getMakananAcak();
document.getElementById('kategori').addEventListener('change', (event) => {
    const selectedKategori = event.target.value;
    getMakananByKategori(selectedKategori);
  });
