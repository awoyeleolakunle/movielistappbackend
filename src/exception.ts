


export class MovieError extends Error{
    constructor(message: string ){
        super(message)
        this.name = 'MovieError';
    }
}