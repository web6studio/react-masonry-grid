import { useRef, useEffect, useMemo } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Link } from "react-router";
import styled from "styled-components";

import usePhotos from "../hooks/usePhotos";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const ITEM_HEIGHT = 340;
const COLUMN_WIDTH = 340;
const GAP = 24;

const Gallery = () => {
  const parentRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = usePhotos();

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

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage error={error} />;

  return (
    <Wrapper ref={parentRef}>
      <Content style={{ height: rowVirtualizer.getTotalSize() }}>
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const rowIndex = virtualRow.index;
          const start = rowIndex * columnCount;
          const end = start + columnCount;
          const items = photos.slice(start, end);

          return (
            <GridRow
              key={rowIndex}
              style={{ transform: `translateY(${virtualRow.start}px)` }}
            >
              {items.map((photo, colIndex) => (
                <StyledLink
                  to={`/photo/${photo.id}`}
                  key={`${photo.id}-${rowIndex}-${colIndex}`}
                >
                  <Photo src={photo.src.medium} alt={photo.alt || "Photo"} />
                </StyledLink>
              ))}
            </GridRow>
          );
        })}
      </Content>

      {isFetchingNextPage && <Loader />}
    </Wrapper>
  );
};

export default Gallery;

const Wrapper = styled.div`
  height: 100vh;
  overflow: auto;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  width: 100%;
  position: relative;
`;

const GridRow = styled.div`
  display: flex;
  justify-content: center;
  gap: ${GAP}px;
  padding: 0 1rem;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
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
