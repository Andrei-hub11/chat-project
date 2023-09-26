import styled from "styled-components";

export const SideBar = styled.div`
  /*   position: absolute;
  right: -100%; */
  grid-area: aside;
  display: flex;
  flex-direction: column;
  border: 1px solid red;
  gap: 1.5rem;
  overflow: hidden auto;
`;

export const BoxSideBar = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SideBarMainBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 0.2rem solid red;
  padding: 0.65rem;

  & img {
    filter: invert(33%) sepia(40%) saturate(4626%) hue-rotate(218deg)
      brightness(100%) contrast(103%);
    cursor: pointer;
  }
`;

export const SideBarMainBox_2 = styled.div`
  display: flex;
  gap: 1rem;
`;

export const SideBarBtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3rem;
  background: #fff;
  & img {
    height: 4rem;
    filter: invert(33%) sepia(40%) saturate(4626%) hue-rotate(218deg)
      brightness(100%) contrast(103%);
    cursor: pointer;
  }
`;

export const SideBarMainBox_3 = styled(SideBarBtnBox)`
  background: unset;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  padding: 0 0.3rem;

  & img {
    position: absolute;
    top: 50%;
    left: 0.5rem;
    transform: translateY(-50%);
    filter: invert(32%) sepia(32%) saturate(6857%) hue-rotate(220deg)
      brightness(102%) contrast(101%);
  }
`;

export const SearchChat = styled.input`
  flex: 1;
  background: #fff;
  outline: none;
  border: 0.2rem solid #3366ff;
  border-radius: 1rem;
  padding-left: 3rem;
  height: 3rem;
  width: 30rem;
  box-shadow: rgba(100, 100, 111, 0.6) 0px 7px 29px 0px;

  &::placeholder {
    color: #000000;
  }
`;

export const ShortcutContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #fff transparent;

  &::-webkit-scrollbar {
    width: 1rem; /* Largura da barra de rolagem vertical */
    height: 1rem; /* Altura da barra de rolagem horizontal */
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 1rem; /* Raio das bordas da alça */
    background-color: #fff;
  }
`;

export const ShortcutToChat = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 1rem;
  padding: 0.2rem 1rem;
  cursor: pointer;
`;

export const ChatNotification = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  width: 4rem;
  background: #fff;
  cursor: pointer;
  border: 0.2rem solid #3366ff;

  & img {
    filter: invert(32%) sepia(32%) saturate(6857%) hue-rotate(220deg)
      brightness(102%) contrast(101%);
  }
`;

export const ChatImageBox = styled.div`
  height: 5rem;
  width: 5rem;

  & img {
    width: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const TitleBoxAndLastmessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1rem;
`;

export const ChatTitle = styled.p`
  font-size: 1.5rem;
  color: #fff;
  font-weight: bold;
`;

export const ChatLastmessage = styled.p`
  font-size: 1.2rem;
  color: #fff;
`;

export const MessageTime = styled.p`
  margin-left: auto;
  font-size: 1.3rem;
  color: #fff;
`;

export const NumberOfNotofications = styled.span`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -1.2rem;
  right: -0.7rem;
  font-size: 1.4rem;
  font-size: 700;
  color: #fff;
  width: 2.5rem;
  height: 2.5rem;
  background: red;
  border-radius: 50%;
`;
