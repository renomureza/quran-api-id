<div align="center">
  <a href="./">
    <img src="./src/assets/logo.png">
  </a>
  <h1 align="center">Quran API ID</h1>
  <p align="center">
    <strong>REST API Al-Quran Indonesia dengan terjemahan, tafsir (Kemenag, Quraish Shihab, Al-Jalalain), audio murottal (per surah dan ayat dari 6 qori), random ayat.</strong>
  </p>
   <p align="center">
    <a href="https://quran-api-id.vercel.app"><strong>Demo</strong></a> · <a href="https://github.com/renomureza/quran-api-id/issues"><strong>Lapor Bug</strong></a> · <a href="https://github.com/renomureza/quran-api-id/issues"><strong>Request Fitur</strong></a>
  </p>
  <a href="https://github.com/renomureza/quran-api-id/graphs/contributors">
    <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/renomureza/quran-api-id">
  </a>
  <a href="https://github.com/renomureza/quran-api-id/network/members">
    <img alt="GitHub forks" src="https://img.shields.io/github/forks/renomureza/quran-api-id">
  </a>
  <a href="https://github.com/renomureza/quran-api-id/stargazers">
    <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/renomureza/quran-api-id">
  </a>
  <a href="https://github.com/renomureza/quran-api-id/issues">
    <img alt="GitHub issues" src="https://img.shields.io/github/issues/renomureza/quran-api-id">
  </a>
  <a href="https://github.com/renomureza/quran-api-id/blob/main/LICENSE">
  <img alt="GitHub license" src="https://img.shields.io/github/license/renomureza/quran-api-id">
  </a>
</div>

## Fitur

Quran API ID merupakan REST API Al-Quran yang menyajikan data Al-Quran dalam bahasa Indonesia. Datanya berasal dari berbagai sumber, data tersebut digabungkan menjadi satu file JSON dengan struktur baru.

Berikut beberapa fitur Quran API ID:

- **6 Audio (murottal)**: murrotal surah yang mencakup semua ayat (dengan suara terjemahan), murottal setiap ayat dari 6 qori: Shaykh Mishari Alafasy, Ahmed ibn Ali al-Ajamy, Husary (Mujawwad), Minshawi, Muhammad Ayyoub, dan Muhammad Jibreel.
- **3 Tafsir**: tafsir setiap ayat dari Kemenag (versi panjang dan pendek), Quraish Shihab, dan Al-Jalalain.
- **Random Ayat**: untuk mendapatkan data ayat secara random.
- **Metadata**: juz, halaman, manzil, ruku, sajda, dan lainnya.
- **Deskripsi Surah**: deskripsi singkat setiap surah seperti golongan surah, jumlah ayat, asal-usul namanya.
- **Gambar Ayat**: ayat dalam gambar.
- _Punya ide attau butuh fitur lain? ajukan [permintaan fitur](https://github.com/renomureza/quran-api-id/issues)_.

## Endpoints

| Endpoint                                 | Contoh                                                                      | Deskripsi                                         |
| ---------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------- |
| `/surahs`                                | [`/surahs`](https://quran-api-id.vercel.app/surahs)                         | daftar surah.                                     |
| `/surahs/{nomorSurah}`                   | [`/surahs/112`](https://quran-api-id.vercel.app/surahs/112)                 | surah tertentu berdasarkan nomor surah (1 - 114). |
| `/surahs/{nomorSurah}/ayahs`             | [`/surahs/112/ayahs`](https://quran-api-id.vercel.app/surahs/112/ayahs)     | semua ayat dari surah tertentu tertentu.          |
| `/surahs/{nomorSurah}/ayahs/{nomorAyat}` | [`/surahs/112/ayahs/2`](https://quran-api-id.vercel.app/surahs/112/ayahs/2) | ayat dari surah tertentu.                         |
| `/random`                                | [`/random`](https://quran-api-id.vercel.app/random)                         | random ayat.                                      |

## Sumber Data

Semua data disimpan di [folder data](https://github.com/renomureza/quran-api-id/tree/main/data), data di folder tmp adalah data mentah, `quran.json` adalah data yang sudah jadi.

Berikut beberapa sumber data yang digunakan:

- [Al-Quran Kemenag](https://quran.kemenag.go.id) (prioritas): nama surah, terjemahan ayat, tafsir Kemenag, dll.
- [Al Quran Cloud](https://alquran.cloud): Metadata, audio ayah.
- [Tanzil](https://tanzil.net/docs/): Tafsir Quraish Shihab dan Al-Jalalain.
- [Al-Quran-ID-API](https://github.com/bachors/Al-Quran-ID-API): deskripsi surah dan audio surah.

## Daftar Perintah (Command)

- `yarn start` - menjalankan server.
- `yarn dev` - menjalankan server pengembangan.
- `yarn build:quran` - untuk membangun ulang data quran utama.

## License

Licensed under [MIT](https://opensource.org/licenses/MIT).
