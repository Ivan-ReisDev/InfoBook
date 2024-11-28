"use client";
import { TableList } from "@/components/table";
import axiosInstance from "@/lib/axios/axiosInstance";
import { IBooks } from "@/types/booksInterface";
import { Input } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import { Toaster } from "@/components/ui/toaster";
import { Forms } from "@/components/forms";

interface FetchBooksResponse {
  books: IBooks[];
}

export default function Home() {
  const [titleBook, setTitleBook] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchBooks = async (): Promise<FetchBooksResponse> => {
    try {
      const response = await axiosInstance.get(`/books?title=${titleBook}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        console.log("Erro de registro:", error.response.data);
      } else if (error instanceof Error) {
        console.log("Erro desconhecido:", error.message);
      }
    }
    return { books: [] };
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["books", titleBook],
    queryFn: fetchBooks,
    enabled: true,
  });

  useEffect(() => {
    if (titleBook === "") {
      refetch();
    }
  }, [titleBook, refetch]);

  return (
    <>
      <div className="p-10 flex flex-col items-center">
        <h1 className="text-3xl font-bold">Info Livros</h1>
        <div className="flex flex-row items-center justify-center">
          <Forms
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            refetch={refetch} // Passando refetch para o Forms
          />
          <Input
            placeholder="Buscar título"
            variant="subtle"
            value={titleBook}
            onChange={(e) => setTitleBook(e.target.value)}
            className="m-5 px-2"
          />
        </div>
        {isLoading && <div className="w-full flex justify-center">Carregando...</div>}

        {error && <div>Erro ao buscar livros: {error.message}</div>}

        {!isLoading && data && Array.isArray(data.books) && data.books.length > 0 ? (
          <TableList data={data.books} />
        ) : (
          !isLoading && <div className="w-full flex justify-center">Nenhum livro encontrado</div>
        )}
      </div>
      <Toaster />
    </>
  );
}
