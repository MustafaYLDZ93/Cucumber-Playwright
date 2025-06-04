@saucedemo
@forloop

Feature: Add To Chart

  Scenario: Tüm ürünleri sepete ekleme doğrulama
    Given kullanıcı Saucedemo ana sayfasına gider
    Then kullanıcı adı ve şifre ile giriş yapıyorum
    When tüm ürünleri sepete ekler
    Then sepetteki ürün sayısı doğrulanır