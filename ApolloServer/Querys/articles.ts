// Helpers
import { callSP } from "../../dbConfig";
// Const
import { ARTICLE_LIMIT_PER_PAGE, CATEGORY_ARTICLE_LIMIT, FAVORITE_ARTICLE_LIMIT, RELATED_ARTICLE_LIMIT } from "../../const/Limits";
import { STORED_PROCEDURES } from "../../const/StoredProcedures";
// Types
import { ArticleType } from "../../types/Types";

type Args = {
    id: number | string
    index: number
    categoryId: number | string
    search: string
    slug: string
};

export const getAllArticles = async () => {
    const procedure: STORED_PROCEDURES = STORED_PROCEDURES.GET_ALL_ARTICLES;

    const articles: ArticleType[] = await callSP({ procedure, values: [] });
    return articles;
};

export const getSingleArticle = async (_: any, args: Args) => {
    const { slug } = args;

    const procedure: STORED_PROCEDURES = STORED_PROCEDURES.GET_SINGLE_ARTICLE;
    const values: [string] = [slug];

    const article: ArticleType[] = await callSP({ procedure, values });
    return article[0];
};

export const getLatestArticles = async (_: any, args: Args) => {
    const { index } = args;

    const procedure: STORED_PROCEDURES = STORED_PROCEDURES.GET_LATEST_ARTICLES;

    const articles: ArticleType[] = await callSP({ procedure, values: [] });
    return articles.slice((index - 1) * ARTICLE_LIMIT_PER_PAGE, (index - 1) * ARTICLE_LIMIT_PER_PAGE + ARTICLE_LIMIT_PER_PAGE);
};

export const getMostVisitedArticles = async () => {
    const procedure: STORED_PROCEDURES = STORED_PROCEDURES.GET_MOST_VISITED_ARTICLES;
    const values: [number] = [FAVORITE_ARTICLE_LIMIT];
    const articles: ArticleType[] = await callSP({ procedure, values });
    return articles;
};

export const getCategoryArticles = async (_: any, args: Args) => {
    const { categoryId, index } = args;

    const procedure: STORED_PROCEDURES = STORED_PROCEDURES.GET_CATEGORY_ARTICLES;
    const values: [number] = [typeof categoryId === 'number' ? categoryId : parseInt(categoryId)];

    const articles: ArticleType[] = await callSP({ procedure, values });

    return articles.slice((index - 1) * CATEGORY_ARTICLE_LIMIT, (index - 1) * CATEGORY_ARTICLE_LIMIT + CATEGORY_ARTICLE_LIMIT);
};

export const getRelatedArticles = async (_: any, args: Args) => {
    const { categoryId } = args;

    const procedure: STORED_PROCEDURES = STORED_PROCEDURES.GET_RELATED_ARTICLES;
    const values: [number, number] = [typeof categoryId === 'number' ? categoryId : parseInt(categoryId), RELATED_ARTICLE_LIMIT];

    const articles: ArticleType[] = await callSP({ procedure, values });
    return articles;
};

export const getSearchedArticles = async (_: any, args: Args) => {
    const { search, index } = args;

    const procedure: STORED_PROCEDURES = STORED_PROCEDURES.GET_SEARCHED_ARTICLES;
    const values: [string] = [search];

    const articles: ArticleType[] = await callSP({ procedure, values });
    return articles.slice((index - 1) * ARTICLE_LIMIT_PER_PAGE, (index - 1) * ARTICLE_LIMIT_PER_PAGE + 7);
};

export const getAdjacentArticles = async (_: any, args: Args) => {
    const { id } = args;

    const procedure: STORED_PROCEDURES = STORED_PROCEDURES.GET_ADJACENT_ARTICLES;
    const values: [number] = [typeof id === 'number' ? id : parseInt(id)]

    const articles: ArticleType[] = await callSP({ procedure, values });
    return articles;
};