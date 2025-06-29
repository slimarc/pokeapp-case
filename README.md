# PokeApp Case 

### 1. Este projeto de uma Pokedex foi desenvolvido com Ionic e Angular, utilizando Standalone e priorizando a separação de responsabilidades. 
### 2. A lógica de negócio foi encapsulada no PokemonService para consumir a PokeAPI de forma reativa com o RxJS Observables e o FavoritesService realiza a persistência dos dados no localstorage.
### 3. O padrão de injeção de dependência foi aplicado de modo que fornecesse os serviços aos componentes, o que garante um código desacoplado.
### 4. A navegação é gerenciada pelo Angular Router.
### 5. Teste unitários com Karma/Jasmine asseguram a qualidade do código, onde foi mockado dependências como o HttpClient para validar a lógica.
### 6. Busquei seguir boas práticas, utilizando a forte tipagem do TypeScript, além de buscar utilizar nomes visando clareza do código.
### 7. Realizei o deploy da aplicaçao no GitHub Pages. [Clique aqui](https://slimarc.github.io/pokeapp-case/)

---
[Para acessar a documentação detalhada, clique aqui.](DOCUMENTATION.md)
