export class CreateArticleDto{
    title: string;
    content?: string;
    images?: string[];
    lastEditorId: number;
}