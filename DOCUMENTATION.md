# PokeApp Case

## 1. Visão Geral e Arquitetura

O aplicativo foi desenvolvido utilizando o framework **Ionic (v7+)** com **Angular (v17+)**, adotando a arquitetura moderna de **Componentes Standalone**.  
Essa abordagem foi escolhida para:

- Promover a modularidade
- Otimizar o build final
- Simplificar a gestão de dependências

A arquitetura central do projeto baseia-se na **Separação de Responsabilidades (Separation of Concerns)**, com uma camada de **Serviços bem definida** que isola a lógica de negócio dos componentes de visualização.  
A comunicação entre essas camadas é gerenciada pela **Injeção de Dependência (DI)** do Angular.

---

## 2. Estrutura de Pastas

A estrutura padrão do Ionic foi refatorada com nomes semânticos para melhor clareza e manutenibilidade:

- src/app/pokedex/ → Página principal de visualização dos Pokémons
- src/app/details/ → Página de detalhes de um Pokémon selecionado
- src/app/favorites/ → Página de listagem dos Pokémons favoritos
- src/app/services/ → Serviços centrais (PokemonService, FavoritesService)
- src/app/tabs/ → Componente shell de navegação principal por abas


---

## 3. Detalhamento dos Componentes

### `PokedexPage`
- Tela principal
- Exibe um Pokémon por vez
- Permite navegação sequencial (anterior/próximo)
- Usa os serviços para buscar dados e gerenciar estado de favorito

### `DetailsPage`
- Exibe informações completas de um Pokémon
- Ativada via rota parametrizada (`/tabs/details/:nome`)
- Utiliza `ActivatedRoute` para capturar o parâmetro
- Usa `NavController` do Ionic para gerenciar a navegação de "voltar"

### `FavoritesPage`
- Lista todos os Pokémons favoritos
- Utiliza o ciclo de vida `ionViewWillEnter` para atualizar a lista
- Usa `FavoritesService` para obter nomes
- Aplica `forkJoin` (RxJS) para buscar os detalhes dos favoritos em paralelo

---

## 4. Detalhamento dos Serviços

### `PokemonService`
- Responsável por comunicação com a **PokeAPI**
- Utiliza `HttpClient` do Angular
- Métodos retornam **Observables** do RxJS
- Facilita consumo reativo e assíncrono nos componentes

### `FavoritesService`
- Gerencia o estado dos Pokémons favoritos
- Utiliza `localStorage` para persistência entre sessões
- Métodos:
  - `toggleFavorite`
  - `isFavorite`
  - `getFavorites`

---

## 5. Estratégia de Testes

### Testes de Serviços
- **PokemonService**:
  - Usa `HttpTestingController` para simular respostas da API
- **FavoritesService**:
  - `localStorage` é mockado com `spyOn` (Jasmine)

### Testes de Componentes
- Injeção de dublês (mocks) para dependências como:
  - `HttpClient`
  - `ActivatedRoute`
- Garante que os componentes sejam instanciados sem erros de injeção

---

## 6. Decisões de Design e UX

### Navegação
- Estrutura refinada em abas:
  - Pokédex
  - Favoritos
- Detalhes são acessados hierarquicamente para melhor usabilidade

### Feedback ao Usuário
- Indicadores de carregamento:
  - `ion-spinner`
  - `ion-loading`
- Tratamento de estados vazios:
  - Exibe mensagens úteis, como "Nenhum favorito ainda"

### Responsividade
- Uso de **Media Queries**
- Ajuste do layout para orientações retrato/paisagem conforme o escopo

