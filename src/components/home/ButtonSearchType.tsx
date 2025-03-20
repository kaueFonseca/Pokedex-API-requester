import { useState, useEffect } from "react";
import styled from "styled-components";
import { getPokemonTypes } from "../../services/pokemonService";

interface Type {
  name: string;
  url: string;
}

const ButtonSearchType = ({ onSelectType }: { onSelectType: (type: string) => void }) => {
  const [types, setTypes] = useState<Type[]>([]);

  useEffect(() => {
    const fetchTypes = async () => {
      const typesData = await getPokemonTypes();
      setTypes(typesData);
    };

    fetchTypes();
  }, []);

  return (
    <SelectFilter onChange={(e: any) => onSelectType(e.target.value)}>
      <option value="">All Types</option>
      {types.map((type) => (
        <option key={type.name} value={type.name}>
          {type.name}
        </option>
      ))}
    </SelectFilter>
  );
};

const SelectFilter = styled.select`
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  margin: 12px 0 0;
  padding: 0 15px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  background-color: #fff;
  color: #757982;
  font-size: 15px;
  font-weight: 500;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export default ButtonSearchType;
