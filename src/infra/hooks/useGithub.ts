import {useQuery} from "react-query";
import {api} from "../services/api";
import {GithubInterface} from "../../core/infra/services/GithubInterface";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export async function getGithubData(): Promise<GithubInterface> {
    const {data} = await api.get<GithubInterface>('/Lucas-Duarte-dev');

    return {
        avatar_url: data?.avatar_url,
        bio: data?.bio,
        created_at: format(parseISO(data?.created_at), 'd MMM yyyy', {
            locale: ptBR
        }),
        name: data?.name,
        login: data?.login,
        location: data?.location,
        date: data?.date,
        html_url: data?.html_url,
        public_repos: data?.public_repos,
        repos_url: data.repos_url
    };
}

export function useGithub() {
    return useQuery('github', () => getGithubData(), {
        staleTime: 1000 * 60 * 10 // 10 minutes
    })
}