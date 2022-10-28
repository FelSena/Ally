import { useEffect, useState } from "react";
import API from "../Api";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormHelperText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { Column, Row } from "../../styles/globals";
import { StyledButton, StyledForm } from "../../styles/form";
import { toast } from "react-toastify";

const Form = () => {
  const [country, setCountry] = useState([]);
  const [city, setCity] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [filteredCities, setFilteredCities] = useState(null);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

  useEffect(() => {
    API.get("country").then((res) => setCountry(res.data));
    API.get("city")
      .then((res) => setCity(res.data))
      .then((res) => setMounted(true));
  }, []);

  const formSchema = yup.object().shape({
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    name: yup.string().required("Nome obrigatório"),
    cellphone: yup.string().required("Telefone obrigatório"),
    cpf: yup.string().required("CPF obrigatório"),
    country: yup.array().required("País Obrigatório").nullable(),
    city: yup.array().required("Cidade Obrigatória").nullable(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmitFunction = (data) => {
    console.log(data);
    toast.success(`${data.name} seu destino foi registrado!`);
  };

  const selectCountries = (arr) => {
    setSelectedCities([]);
    const filtered = [];
    arr.forEach((element) => {
      const countryCode = country.find((item) => item.name_ptbr === element);
      const filter = city.filter(
        (item) => item.country_code === countryCode.code
      );
      filtered.push(...filter);
    });
    setFilteredCities(filtered);
  };

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    selectCountries(value);
    setSelectedCountries(value);
  };

  const handleChangeCity = (e) => {
    const {
      target: { value },
    } = e;
    setSelectedCities(value);
  };
  return (
    <StyledForm onSubmit={handleSubmit(onSubmitFunction)}>
      <Row>
        <Column gap="25px">
          <h2>Dados pessoais:</h2>
          <TextField
            variant="outlined"
            helperText={errors.name?.message}
            label="Nome"
            {...register("name")}
          />

          <TextField
            variant="outlined"
            helperText={errors.email?.message}
            label="Email"
            {...register("email")}
          />

          <TextField
            variant="outlined"
            helperText={errors.cellphone?.message}
            label="Telefone"
            {...register("cellphone")}
          />

          <TextField
            variant="outlined"
            label="CPF"
            placeholder="000.000.000-00"
            helperText={errors.cpf?.message}
            {...register("cpf")}
          />
        </Column>
        <Column gap="25px" justify="flex-start" height="100%">
          <h2>Próximos destinos:</h2>
          <Select
            value={selectedCountries}
            multiple
            displayEmpty
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <span>Escolha seu próximo destino</span>;
              }
              return selected.join(", ");
            }}
            {...register("country", { onChange: (e) => handleChange(e) })}
            sx={{ maxWidth: 300, minWidth: 300 }}
          >
            <MenuItem disabled value="">
              Escolha seu proximo destino
            </MenuItem>
            {mounted &&
              country.map((item) => (
                <MenuItem key={item.name} value={item.name_ptbr}>
                  {item.name_ptbr}
                </MenuItem>
              ))}
          </Select>
          <FormHelperText>{errors.country?.message}</FormHelperText>

          <Select
            value={selectedCities}
            multiple
            displayEmpty
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <span>Escolha a próximo cidade</span>;
              }
              return selected.join(", ");
            }}
            {...register("city", { onChange: (e) => handleChangeCity(e) })}
            sx={{ maxWidth: 300, minWidth: 300 }}
          >
            {filteredCities !== null ? (
              filteredCities.length > 0 ? (
                filteredCities.map((item) => (
                  <MenuItem key={item.id} value={item.name_ptbr || item.name}>
                    {item.name_ptbr || item.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="No cities">Sem cidades disponiveis</MenuItem>
              )
            ) : (
              <MenuItem disabled>Primeiro escolha um país</MenuItem>
            )}
          </Select>
          <FormHelperText>{errors.city?.message}</FormHelperText>
        </Column>
      </Row>
      <StyledButton type="submit">Enviar</StyledButton>
    </StyledForm>
  );
};

export default Form;
