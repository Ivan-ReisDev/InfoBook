"use client";
import { Toaster, toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import {
    DialogBody,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import axiosInstance from "@/lib/axios/axiosInstance";
import { IBooks } from "@/types/booksInterface";
import { Input } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useState } from "react";

interface FormsProps {
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    refetch: () => void; 
}

export const Forms = ({ isModalOpen, setIsModalOpen, refetch }: FormsProps) => {
    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [yaer, setYaer] = useState<number | string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            if (typeof yaer === "number") {
                const data: IBooks = {
                    title,
                    author,
                    publishedYear: yaer,
                };

                const response = await axiosInstance.post(`/books`, data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.status === 201) {
                    toaster.create({
                        type: "success",
                        title: "Sucesso",
                        description: "Livro cadastrado com sucesso!",
                    });
                    setIsModalOpen(false);
                    setAuthor("");
                    setTitle("");
                    setYaer("");
                    refetch(); 
                    return;
                }

                toaster.create({
                    type: "error",
                    title: "Erro",
                    description: "O ano deve ser um número",
                });
            }
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response) {
                toaster.create({
                    type: "error",
                    title: "Erro",
                    description: error.response.data.error,
                });
            } else if (error instanceof Error) {
                toaster.create({
                    type: "error",
                    title: "Erro",
                    description: "Erro desconhecido",
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <DialogRoot
                open={isModalOpen}
                onOpenChange={(details) => setIsModalOpen(!!details.open)}
                placement="center"
            >
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => setIsModalOpen(true)}>
                        Cadastrar
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Cadastrar Livro</DialogTitle>
                    </DialogHeader>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                    >
                        <DialogBody>
                            <label htmlFor="title">Título *</label>
                            <Input
                                id="title"
                                placeholder="Digite seu título"
                                variant="subtle"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mb-3 px-2"
                                type="text"
                                required
                            />

                            <label htmlFor="author">Autor *</label>
                            <Input
                                id="author"
                                placeholder="Informe o nome do autor"
                                variant="subtle"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                className="mb-3 px-2"
                                type="text"
                                required
                            />

                            <label htmlFor="publishedYear">Ano de Publicação *</label>
                            <Input
                                id="publishedYear"
                                placeholder="Informe o ano ex: 2024"
                                variant="subtle"
                                value={yaer}
                                onChange={(e) => setYaer(Number(e.target.value))}
                                className="mb-3 px-2"
                                type="number"
                                required
                            />
                        </DialogBody>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? "Enviando..." : "Enviar"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </DialogRoot>
            <Toaster />
        </>
    );
};
