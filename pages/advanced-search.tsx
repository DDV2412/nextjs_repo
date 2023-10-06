import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { NextSeo } from "next-seo";
import { MyPage } from "./../components/common/types";
import CTA from "@/components/common/CTA";
import ButtonPrimary from "@/components/button/ButtonPrimary";
import classnames from "classnames";
import { useRouter } from "next/router";

const AdvancedSearch: MyPage = () => {
  const router = useRouter();
  const [rangeYear, setRangeYear] = useState(false);
  const currentYear = new Date().getFullYear();
  const min = 1990;
  const max = currentYear;
  const [minVal, setMinVal] = useState<number>(min);
  const [maxVal, setMaxVal] = useState<number>(max);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermSelect, setSearchTermSelect] = useState("All Metadata");

  const [advancedOptions, setAdvancedOptions] = useState([
    { operation: "AND", term: "", field: "All Metadata" },
  ]);

  const [advancedOptionOperations, setAdvancedOptionOperations] = useState([
    "AND",
  ]);

  const addAdvancedOption = () => {
    setAdvancedOptions((prevOptions) => [
      ...prevOptions,
      { operation: "AND", term: "", field: "All Metadata" },
    ]);
    setAdvancedOptionOperations((prevOperations) => [...prevOperations, "AND"]);
  };

  const removeAdvancedOption = (index: number) => {
    setAdvancedOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions.splice(index, 1);
      return updatedOptions;
    });
    setAdvancedOptionOperations((prevOperations) => {
      const updatedOperations = [...prevOperations];
      updatedOperations.splice(index, 1);
      return updatedOperations;
    });
  };

  const handleAdvancedOptionChange = (
    index: number,
    key: keyof {
      operation: string;
      term: string;
      field: string;
    },
    value: string
  ) => {
    setAdvancedOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index][key] = value;
      return updatedOptions;
    });
  };

  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value);
      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let searchString = "";

    if (searchTermSelect && searchTerm) {
      searchString += `("${searchTermSelect}":${searchTerm})`;
    }

    const groupedOptions = advancedOptions.reduce(
      (
        groups: {
          AND: string[];
          OR: string[];
          NOT: string[];
        },
        option: {
          operation: string;
          term: string;
          field: string;
        }
      ) => {
        if (option.operation === "AND") {
          groups.AND.push(`("${option.field}":${option.term})`);
        } else if (option.operation === "OR") {
          groups.OR.push(`("${option.field}":${option.term})`);
        } else if (option.operation === "NOT") {
          groups.NOT.push(`("${option.field}":${option.term})`);
        }
        return groups;
      },
      { AND: [], OR: [], NOT: [] }
    );

    if (groupedOptions.AND.length > 0) {
      searchString += ` AND ${groupedOptions.AND.join(" AND ")}`;
    }

    if (groupedOptions.OR.length > 0) {
      searchString += ` OR ${groupedOptions.OR.join(" OR ")}`;
    }

    if (groupedOptions.NOT.length > 0) {
      searchString += ` NOT ${groupedOptions.NOT.join(" NOT ")}`;
    }

    const currentQuery = { ...router.query };

    currentQuery.advancedQuery = searchString;

    if (rangeYear) {
      currentQuery.rangeYear = minVal + "_" + maxVal;
    }

    router.push({
      pathname: "/articles",
      query: currentQuery,
    });
  };

  return (
    <>
      <NextSeo title="Advanced Search | IPMUGO Digital Library" />
      <section className="container">
        <div className="min-w-full bg-slate-900 pl-16 h-[12rem] overflow-hidden">
          <div className="max-w-[80%] flex flex-col gap-y-4 justify-center h-full">
            <h1 className="text-3xl font-semibold text-white">
              Advanced Search
            </h1>
          </div>
        </div>
      </section>
      <section className="container py-8">
        <form onSubmit={submitHandler} className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3">
              <input
                type="text"
                name="SearchTerm"
                placeholder="Search Term"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg outline-none bg-slate-100/30 text-slate-900"
              />
            </div>
            <select
              name="SearchTermSelect"
              value={searchTermSelect}
              onChange={(e) => setSearchTermSelect(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg outline-none bg-slate-100/30 text-slate-900"
            >
              <option value="All Metadata">All Metadata</option>
              <option value="Full Text">Full Text</option>
              <option value="Document Title">Document Title</option>
              <option value="Authors">Authors</option>
              <option value="Publication Title">Publication Title</option>
              <option value="Abstract">Abstract</option>
              <option value="DOI">DOI</option>
              <option value="Issue">Issue</option>
              <option value="Article Page Number">Article Page Number</option>
              <option value="Keywords">Keywords</option>
            </select>
          </div>

          {advancedOptions.map((option, index) => (
            <div key={index} className="grid grid-cols-4 gap-4">
              <select
                name={`AdvancedOptionOperation${index}`}
                value={option.operation}
                onChange={(e) =>
                  handleAdvancedOptionChange(index, "operation", e.target.value)
                }
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg outline-none bg-slate-100/30 text-slate-900"
              >
                <option value="AND">AND</option>
                <option value="OR">OR</option>
                <option value="NOT">NOT</option>
              </select>
              <div className="col-span-2">
                <input
                  type="text"
                  placeholder="Search Term"
                  name={`AdvancedOptionTerm${index}`}
                  value={option.term}
                  onChange={(e) =>
                    handleAdvancedOptionChange(index, "term", e.target.value)
                  }
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg outline-none bg-slate-100/30 text-slate-900"
                />
              </div>

              <div className="flex justify-between items-center gap-4">
                <select
                  name={`AdvancedOptionSelect${index}`}
                  value={option.field}
                  onChange={(e) =>
                    handleAdvancedOptionChange(index, "field", e.target.value)
                  }
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg outline-none bg-slate-100/30 text-slate-900"
                >
                  <option value="All Metadata">All Metadata</option>
                  <option value="Full Text">Full Text</option>
                  <option value="Document Title">Document Title</option>
                  <option value="Authors">Authors</option>
                  <option value="Publication Title">Publication Title</option>
                  <option value="Abstract">Abstract</option>
                  <option value="DOI">DOI</option>
                  <option value="Issue">Issue</option>
                  <option value="Article Page Number">
                    Article Page Number
                  </option>
                  <option value="Keywords">Keywords</option>
                </select>
                <button
                  type="button"
                  onClick={() => removeAdvancedOption(index)}
                  className="bg-rose-700 text-white p-3 rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.46967 5.46967C5.76256 5.17678 6.23744 5.17678 6.53033 5.46967L12 10.9393L17.4697 5.46967C17.7626 5.17678 18.2374 5.17678 18.5303 5.46967C18.8232 5.76256 18.8232 6.23744 18.5303 6.53033L13.0607 12L18.5303 17.4697C18.8232 17.7626 18.8232 18.2374 18.5303 18.5303C18.2374 18.8232 17.7626 18.8232 17.4697 18.5303L12 13.0607L6.53033 18.5303C6.23744 18.8232 5.76256 18.8232 5.46967 18.5303C5.17678 18.2374 5.17678 17.7626 5.46967 17.4697L10.9393 12L5.46967 6.53033C5.17678 6.23744 5.17678 5.76256 5.46967 5.46967Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}

          <div className="min-w-full flex justify-end ">
            <ButtonPrimary type="button" onClick={addAdvancedOption}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M13.5 16.875H16.875M16.875 16.875H20.25M16.875 16.875V13.5M16.875 16.875V20.25M6 10.5H8.25C9.49264 10.5 10.5 9.49264 10.5 8.25V6C10.5 4.75736 9.49264 3.75 8.25 3.75H6C4.75736 3.75 3.75 4.75736 3.75 6V8.25C3.75 9.49264 4.75736 10.5 6 10.5ZM6 20.25H8.25C9.49264 20.25 10.5 19.2426 10.5 18V15.75C10.5 14.5074 9.49264 13.5 8.25 13.5H6C4.75736 13.5 3.75 14.5074 3.75 15.75V18C3.75 19.2426 4.75736 20.25 6 20.25ZM15.75 10.5H18C19.2426 10.5 20.25 9.49264 20.25 8.25V6C20.25 4.75736 19.2426 3.75 18 3.75H15.75C14.5074 3.75 13.5 4.75736 13.5 6V8.25C13.5 9.49264 14.5074 10.5 15.75 10.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ButtonPrimary>
          </div>

          <div className="min-w-full h-[1px] bg-slate-200"></div>

          <div className="flex justify-between items-end">
            <div className="pt-12 max-w-[20rem]">
              <div className="flex justify-start items-center gap-4 relative mb-8">
                <input
                  type="checkbox"
                  name="range"
                  onChange={(e) => setRangeYear(!rangeYear)}
                  checked={rangeYear}
                  className=" relative flex justify-center items-center peer shrink-0 appearance-none w-5 h-5 border-2 border-indigo-200 rounded-md bg-white mt-1 checked:bg-indigo-700 checked:border-0"
                />
                <label>Specify Year Range</label>
                <svg
                  className="absolute w-4 h-4 mt-[3px] mx-0.5 peer-checked:flex justify-center items-center hidden pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M10.5 1.875C10.5 1.25368 11.0037 0.75 11.625 0.75C12.2463 0.75 12.75 1.25368 12.75 1.875V10.0938C13.2674 10.2561 13.7708 10.4757 14.25 10.7527V3.375C14.25 2.75368 14.7537 2.25 15.375 2.25C15.9963 2.25 16.5 2.75368 16.5 3.375V14.3122C15.0821 14.5501 13.8891 15.451 13.2506 16.6852C14.4554 16.0866 15.8134 15.75 17.25 15.75C17.6642 15.75 18 15.4142 18 15V12.75L18 12.7336C18.0042 11.8771 18.3339 11.0181 18.9885 10.3635C19.4278 9.92417 20.1402 9.92417 20.5795 10.3635C21.0188 10.8028 21.0188 11.5152 20.5795 11.9545C20.361 12.173 20.2514 12.4567 20.25 12.7445L20.25 12.75L20.25 15.75H20.2454C20.1863 17.2558 19.5623 18.6877 18.4926 19.7574L16.7574 21.4926C15.6321 22.6179 14.106 23.25 12.5147 23.25H10.5C6.35786 23.25 3 19.8921 3 15.75V6.375C3 5.75368 3.50368 5.25 4.125 5.25C4.74632 5.25 5.25 5.75368 5.25 6.375V11.8939C5.71078 11.4421 6.2154 11.0617 6.75 10.7527V3.375C6.75 2.75368 7.25368 2.25 7.875 2.25C8.49632 2.25 9 2.75368 9 3.375V9.90069C9.49455 9.80023 9.99728 9.75 10.5 9.75V1.875Z"
                    fill="#fff"
                  />
                </svg>
              </div>
              <div className="relative w-full flex justify-between">
                <input
                  type="range"
                  min={min}
                  max={max}
                  value={minVal}
                  ref={minValRef}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const value = Math.min(+event.target.value, maxVal - 1);
                    setMinVal(value);
                    event.target.value = value.toString();
                  }}
                  className={classnames("thumb thumb--zindex-3", {
                    "thumb--zindex-5": minVal > max - 100,
                  })}
                />
                <input
                  type="range"
                  min={min}
                  max={max}
                  value={maxVal}
                  ref={maxValRef}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const value = Math.max(+event.target.value, minVal + 1);
                    setMaxVal(value);
                    event.target.value = value.toString();
                  }}
                  className="thumb thumb--zindex-4"
                />
              </div>
              <div className="slider">
                <div className="slider__track"></div>
                <div ref={range} className="slider__range"></div>
              </div>
              <div className="flex justify-between items-center gap-3 mt-10">
                <div className="flex flex-col gap-2">
                  <label>From</label>
                  <input
                    type="text"
                    placeholder="Search within results ... "
                    name="min"
                    value={minVal}
                    onChange={(e) => setMinVal(parseInt(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg outline-none bg-slate-100/30 text-slate-900"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label>To</label>
                  <input
                    type="text"
                    placeholder="Search within results ... "
                    name="max"
                    value={maxVal}
                    onChange={(e) => setMaxVal(parseInt(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg outline-none bg-slate-100/30 text-slate-900"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <ButtonPrimary type="submit">Search</ButtonPrimary>
            </div>
          </div>
        </form>
      </section>

      <CTA />
    </>
  );
};

export default AdvancedSearch;
AdvancedSearch.Layout = "Main";
