@saucedemo
@login
Feature: 1-Giriş yapma

  Scenario: 1-Successful login and logout
    Given Ana sayfaya gidiyorum
    When Geçerli kullanıcı adı ve şifre ile giriş yapıyorum
    Then Envanter sayfasına yönlendirildiğimi doğrula
    When Hesabımdan çıkış yapıyorum
    Then Giriş sayfasına yönlendirildiğimi doğrula

  Scenario: 1-Unsuccessful login and error message verification
    Given Ana sayfaya gidiyorum
    When Geçersiz kullanıcı adı ve şifre ile giriş yapıyorum
    Then Hata mesajını gördüğümü doğrula
