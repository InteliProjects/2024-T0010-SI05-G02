'use client'
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Fuse from 'fuse.js';
import axios from 'axios';

interface Option {
    value: string;
    label: string;
}

export interface Produtos {
    name: string;
    sku: string;
}

interface SelectSearchProps {
    noOptions: (value: boolean) => void;
    optionSelected: (option: Option) => void;
}

const customStyles = {
    control: (provided: any) => ({
        ...provided,
        backgroundColor: 'rgb(229 231 235 / var(--tw-bg-opacity));',
        borderRadius: '0.375rem',
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem',
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        border: '0',
        position: 'relative',
        zIndex: '0'
    }),
    menu: (provided: any) => ({
        ...provided,
        borderRadius: 'rounded-md',
    }),
    option: (provided: any, state: { isSelected: boolean }) => ({
        ...provided,
        backgroundColor: state.isSelected ? 'blue-500' : 'white',
        '&:hover': {
            backgroundColor: 'blue-100',
        },
    }),
};

const noOptionsMessage = { value: '', label: 'Nenhum item encontrado' };

const SelectSearch: React.FC<SelectSearchProps> = ({noOptions, optionSelected}) => {
    const [produtos, setProdutos] = useState<Produtos[]>([]);

    const getProdutos = async () => {
        try {
            const response = await axios.get<Produtos[]>('http://localhost:3333/produtos');
            console.log(response.data);
            
            setProdutos(response.data);
        } catch (error) {
            console.error("Erro ao buscar produtos", error);
        }
    };

    useEffect(() => {
        getProdutos();
    }, []);

    const options: Option[] = produtos.map(produto => ({
        value: produto.sku,
        label: produto.name
    }));

    const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);

    const fuse = new Fuse(options, {
        keys: ['label'],
        threshold: 0.4,
        distance: 1000,
        includeScore: true,
        ignoreLocation: true,
    });

    const handleInputChange = (newValue: string) => {
        if (newValue.length > 0) {
            const fuseResults = fuse.search(newValue);
            const results = fuseResults.map(result => result.item);

            if (results.length > 0) {
                setFilteredOptions(results);
            } else {
                setFilteredOptions([noOptionsMessage]); // Mostra "Nenhum item encontrado"
            }
        } else {
            setFilteredOptions(options);
        }

        return newValue;
    };

    return (
        <div className="mb-4">
            <label className="block text-black text-xl font-medium mb-2">
                Produto
            </label>
            <Select
                styles={customStyles}
                options={filteredOptions}
                onInputChange={handleInputChange}
                filterOption={null}
                placeholder="Selecione um Produto"
                classNamePrefix="react-select"
                onChange={(e) => {
                    if (e?.label !== 'Nenhum item encontrado') {
                        noOptions(false);
                        e?.value && optionSelected(e);
                    } else {
                        noOptions(true);
                    }
                }}
                noOptionsMessage={() => 'Nenhum item encontrado'} // Customiza a mensagem quando não há opções
            />
        </div>
    );
};

export default SelectSearch;
