import { useParams, useNavigate } from "react-router";
import styled from "styled-components";

import usePhoto from "../hooks/usePhoto";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const PhotoDetail = () => {
  const { id } = useParams();
  const { data: photo, isLoading, isError, error } = usePhoto(id);
  const navigate = useNavigate();

  if (isLoading)
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  if (isError)
    return (
      <LoaderWrapper>
        <ErrorMessage error={error} />
      </LoaderWrapper>
    );
  if (!photo)
    return (
      <LoaderWrapper>
        <ErrorMessage error={new Error("Photo not found")} />
      </LoaderWrapper>
    );

  return (
    <Wrapper>
      <BackButton onClick={() => navigate(-1)}>❮ Back to gallery</BackButton>

      <ImageWrapper>
        <Image src={photo.src.large2x} alt={photo.alt || "Photo"} />
      </ImageWrapper>

      <Info>
        <Title>{photo.alt || "Untitled"}</Title>
        <Text>
          <strong>Photographer:</strong> {photo.photographer}
        </Text>
        <Text>
          <strong>Size:</strong> {photo.width}x{photo.height}px
        </Text>
      </Info>
    </Wrapper>
  );
};

export default PhotoDetail;

const Wrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const LoaderWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 2rem;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  border-radius: ${({ theme }) => theme.radius};
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  width: 100%;
  display: block;
`;

const Info = styled.div`
  margin-top: 2rem;
`;

const Title = styled.h2`
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 1.4rem;
`;

const Text = styled.p`
  margin: 0.8rem 0;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
