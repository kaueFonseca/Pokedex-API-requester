import styled from "styled-components";

interface PokeCardProps {
  name: string;
  url: string;
}

const PokeCard: React.FC<PokeCardProps> = ({ name, url }) => {
  const getPokemonId = (url: string) => {
    const parts = url.split("/");
    return parts[parts.length - 2];
  };

  const id = getPokemonId(url);

  return (
    <LI>
      <DivID>
        <PagraphID>#{id}</PagraphID>
      </DivID>
      <Divimg>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt={name}
          width={100}
          height={100}
        />
      </Divimg>
      <Pagraph>{name}</Pagraph>
    </LI>
  );
};

const LI = styled.li`
  background-color: #fff;
  list-style: none;
  margin: 15px;
  width: 142px;
  height: 142px;
  text-align: center;
  border-radius: 10px;
  padding: 5px;
  box-shadow: 1px 1px 15px 0px rgb(210, 210, 210);
   
  &:hover {
    cursor: pointer;
    background-color: rgb(210, 210, 210);
  }
`;

const DivID = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;
const Divimg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PagraphID = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #fff;
  text-align: right;
  background-color: #8DDB8A;
  padding: 0 10px;
  border-radius: 15px;
  `;
const Pagraph = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: #000;
  text-align: center;
  position: relative;
  top: -12px;
`;

export default PokeCard;
