const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Pengujian UI dengan Validasi Tambahan', function() {
    this.timeout(30000); // Set waktu timeout untuk Mocha

    let driver;

    // Inisialisasi WebDriver sebelum menjalankan test case
    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    // Tutup WebDriver setelah semua test selesai
    after(async function() {
        await driver.quit();
    });

    it('seharusnya memuat halaman login', async function() {
        await driver.get("D:/KULIAH/TUGAS SEMESTER 5/PRAKTIKUM PPMPL/ui-testing-selenium/login.html");
        const title = await driver.getTitle();
        expect(title).to.equal('Login Page');
    });

    it('seharusnya memasukkan username dan password dengan CSS Selector dan XPath', async function() {
        await driver.findElement(By.css('#username')).sendKeys('testuser'); // Menggunakan CSS Selector
        await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys('password123'); // Menggunakan XPath
        const usernameValue = await driver.findElement(By.css('#username')).getAttribute('value');
        const passwordValue = await driver.findElement(By.xpath('//*[@id="password"]')).getAttribute('value');
        expect(usernameValue).to.equal('testuser');
        expect(passwordValue).to.equal('password123');
    });

    it('seharusnya melakukan validasi login gagal jika username atau password salah', async function() {
        await driver.findElement(By.id('username')).clear();
        await driver.findElement(By.id('password')).clear();
        await driver.findElement(By.id('username')).sendKeys('salahUser');
        await driver.findElement(By.id('password')).sendKeys('salahPassword');
        await driver.findElement(By.id('loginButton')).click();
        
        // Memeriksa apakah pesan error muncul setelah login gagal
        const errorMessage = await driver.findElement(By.id('errorMessage')).getText();
        expect(errorMessage).to.equal('Username atau password salah');
    });

    it('seharusnya melakukan validasi visual untuk tombol login', async function() {
        const isDisplayed = await driver.findElement(By.id('loginButton')).isDisplayed();
        expect(isDisplayed).to.be.true; // Memeriksa apakah tombol login terlihat di layar
    });
});
