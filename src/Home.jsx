import { useState } from "react";

import { months } from "./data/months";

import FileUploader from "./components/file-uploader";
import Birthdays from "./components/birthdays";
import { Button, Select, Text } from "@chakra-ui/react";
import Recognition from "./components/recognition";

export const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [model, setModel] = useState("birthdays");
  const [desiredMonth, setDesiredMonth] = useState("1");
  const [templateView, setTemplateView] = useState("");
  const [error, setError] = useState("");

  const loadTemplateView = () => {
    setError('');
    if (!selectedFile) {
      setError('Nenhum arquivo selecionado.');
      return;
    }

    if (selectedFile) {
      const allowedTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel'
      ];

      if (!allowedTypes.includes(selectedFile.type)) {
        setError("Apenas arquivos Excel são permitidos (.xls, .xlsx).");
        return;
      }
    }

    if (model === "birthdays") {
      return setTemplateView("birthdays");
    }

    return setTemplateView("recognition");
  };

  const handleChange = (event) => {
    setModel(event.target.value);
  };

  const handleMonthChange = (event) => {
    setDesiredMonth(event.target.value);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className="text-3xl mb-3 font-bold">Gerador de Anexos</h1>
        <div className="flex flex-col justify-center">
          <div className="p-3 justify-center align-middle">
            <FileUploader onFileSelected={setSelectedFile} />
          </div>
          <div>
            <blockquote className="text-gray-500 text-sm align-middle ">
              Selecione o arquivo Excel com os dados dos colaboradores.<br />
            </blockquote>
            <blockquote className="text-gray-500 text-sm align-middle text-justify">
              <b>Lembrete!</b> O departamento precisa ser ajustado manualmente na planilha antes de ser exportado! (😬)
            </blockquote>
          </div>
          <div className="p-3">
            <div className="flex flex-row justify-center">
              <div className="form-check m-1">
                <input className="form-radio align-middle h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  type="radio"
                  value="birthdays"
                  name="radio-sizes"
                  id="radio-small"
                  checked={model === 'birthdays'}
                  onChange={handleChange}
                />
                <label htmlFor="radio-small" className="ml-2 text-base font-medium text-gray-900">
                  Aniversários do mês
                </label>
              </div>
              <div className="form-check m-1">
                <input className="form-radio align-middle h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  type="radio"
                  value="recognition"
                  name="radio-sizes"
                  id="radio-small"
                  checked={model === 'recognition'}
                  onChange={handleChange}
                />
                <label htmlFor="radio-small" className="ml-2 text-base font-medium text-gray-900">
                  Tempo de casa
                </label>
              </div>
            </div>
            <div className="flex row mt-3 w-full flex-wrap md:flex-nowrap gap-4 justify-center">
              <Select
                className="max-w-xs w-full border border-gray-300 rounded-md p-2"
                label="Selecione o mês"
                value={desiredMonth}
                onChange={handleMonthChange}
              >
                {months.map((month) => (
                  <option key={month.key} value={month.key}>{month.label}</option>
                ))}
              </Select>
            </div>
          </div>
        </div>
        <Button
          className="bg-orange-500 text-white shadow-lg rounded-2xl p-3"
          onClick={loadTemplateView}
        >
          Separar registros
        </Button>
        {error && <div className="p-3">
          <Text className="border text-white bg-red-500 shadow-lg rounded-2xl p-3">{error}</Text>
        </div>}
        {templateView === "birthdays" && (
          <div className="flex flex-col justify-center align-middle">
            <Birthdays desiredMonth={desiredMonth} file={selectedFile} />
          </div>
        )}
        {templateView === "recognition" && (
          <div className="flex flex-col justify-center align-middle">
            <Recognition file={selectedFile} desiredMonth={desiredMonth} />
          </div>
        )}
      </div>
    </section>
  );
};
