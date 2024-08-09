export class Usuario {
    constructor(
        public id?: Number | null | number,
        public nome?: string,
        public email?: string,
        public role?: string,
    ) {}
}