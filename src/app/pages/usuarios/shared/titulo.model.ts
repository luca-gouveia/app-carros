export class Titulo {
    constructor(
        public id?: Number,
        public titulo?: string,
        public diretor?: string,
        public atores?: string,
        public descricao?: string,
        public imdbID?: string,
        public linkImagem?: string,
        public genero?: string[],
        public avaliacao?: Number,
        public avaliado?: boolean,
    ) {}
}