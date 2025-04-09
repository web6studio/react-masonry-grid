import { useRef, useEffect, useMemo, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Link } from "react-router";
import styled from "styled-components";

import usePhotos from "../hooks/usePhotos";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import SearchInput from "../components/SearchInput";

const ITEM_HEIGHT = 375;
const COLUMN_WIDTH = 375;
const GAP = 25;

const Gallery = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = usePhotos(query);

  const photos = data?.pages.flatMap((page) => page.photos) ?? [];

  const columnCount = useMemo(() => {
    const width = parentRef.current?.clientWidth || 1200;
    if (width < 640) return 1;
    if (width < 1024) return 2;
    return Math.floor(width / (COLUMN_WIDTH + GAP));
  }, [parentRef.current?.clientWidth]);

  const rowCount = Math.ceil(photos.length / columnCount);

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ITEM_HEIGHT,
    overscan: 5,
  });

  useEffect(() => {
    const lastRow = rowVirtualizer.getVirtualItems().at(-1);
    if (lastRow?.index === rowCount - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [
    rowVirtualizer.getVirtualItems(),
    rowCount,
    hasNextPage,
    isFetchingNextPage,
  ]);

  return (
    <Container ref={parentRef}>
      <SearchWrapper>
        <SearchInput onChange={setQuery} value={query} />
      </SearchWrapper>

      <Content style={{ height: rowVirtualizer.getTotalSize() }}>
        {isLoading && <Loader />}

        {isError && <ErrorMessage error={error} />}

        {!isLoading && !isError && photos.length === 0 && (
          <NoResults>😕 No photos found</NoResults>
        )}

        {!isLoading &&
          !isError &&
          rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const rowIndex = virtualRow.index;
            const start = rowIndex * columnCount;
            const end = start + columnCount;
            const items = photos.slice(start, end);

            return (
              <GridRow
                key={rowIndex}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  transform: `translateY(${virtualRow.start}px)`,
                  width: "100%",
                }}
              >
                {items.map((photo) => (
                  <StyledLink to={`/photo/${photo.id}`} key={photo.id}>
                    <Photo src={photo.src.medium} alt={photo.alt || "Photo"} />
                  </StyledLink>
                ))}
              </GridRow>
            );
          })}
      </Content>

      {isFetchingNextPage && <Loader />}
    </Container>
  );
};

export default Gallery;

const Container = styled.div`
  height: 100vh;
  overflow: auto;
  padding: 1.5rem 1rem;
`;

const SearchWrapper = styled.div`
  max-width: 640px;
  margin: 0 auto 2rem auto;
`;

const Content = styled.div`
  position: relative;
`;

const GridRow = styled.div`
  display: flex;
  justify-content: center;
  gap: ${GAP}px;
  padding: 0 1rem;
`;

const StyledLink = styled(Link)`
  display: block;
  width: ${COLUMN_WIDTH}px;
  height: ${ITEM_HEIGHT - GAP}px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radius};
  overflow: hidden;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const NoResults = styled.p`
  text-align: center;
  padding: 3rem 1rem;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
