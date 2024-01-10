import React, { useState } from "react";
import BookSearchForm from "../components/BookSearchForm";
import axios from "axios";
import Loader from "../components/Loader";
import BookList from "../components/BookList";
import {
  Header,
  HeaderContainer,
  LogoText,
  HeaderSearchForm,
  Container,
} from "../components/Shared";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState({});
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = `https://www.googleapis.com/books`;

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const result = await axios.get(
        `${API_BASE_URL}/v1/volumes?q=${searchTerm}`
      );
      setBooks(result.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBooks();
  };

  const reload = () => {
    setSearchTerm("");
    setBooks({});
  };

  return (
    <>
      <Header>
        <HeaderContainer>
          <LogoText onClick={reload}>Book List</LogoText>
          <HeaderSearchForm>
            <BookSearchForm
              onSubmit={handleSubmit}
              onChange={handleChange}
              searchTerm={searchTerm}
            />
          </HeaderSearchForm>
        </HeaderContainer>
      </Header>

      <Container>
        <Loader loading={loading}>
          "<strong>{searchTerm}</strong>" 책을 찾고 있습니다.
        </Loader>
        <BookList books={books} />
      </Container>
    </>
  );
};

export default SearchPage;
