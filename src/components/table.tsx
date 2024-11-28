import { IBooks } from "@/types/booksInterface";
import { Stack, Table } from "@chakra-ui/react";

interface Props {
  data: IBooks[];
}

export const TableList = ({ data }: Props) => {
  return (
    <Stack width="full" gap="5">
      <Table.Root size="sm" variant="outline" striped>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Título</Table.ColumnHeader>
            <Table.ColumnHeader>Autor</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Ano de Publicação</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((book) => (
              <Table.Row key={book.id}>
                <Table.Cell>{book.title}</Table.Cell>
                <Table.Cell>{book.author}</Table.Cell>
                <Table.Cell textAlign="end">{book.publishedYear}</Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={3}>Nenhum livro disponível</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </Stack>
  );
};
