import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  ChangeEvent,
} from 'react';
import { NextSeo } from 'next-seo';
import { MyPage } from '../components/common/types';
import HeroSection from '@/components/common/Hero';
import CTA from '@/components/common/CTA';
import classnames from 'classnames';
import ButtonPrimary from '@/components/button/ButtonPrimary';
import ArticleCard from '@/components/card/ArticleCard';
import { Pagination } from '@/components/link/Pagination';
import { useRouter } from 'next/router';
import { Loading } from '@/components/common/Loading';

const Articles: MyPage = () => {
  const currentYear = new Date().getFullYear();
  const min = 1990;
  const router = useRouter();
  const [articles, setArticles] = useState({
    articles: [],
    aggrs: {
      subjects: [],
      journal: [],
      creators: [],
    },
    total: 0,
    current_page: 1,
    total_pages: 1,
  });
  const [loading, setLoading] = useState(true);
  const max = currentYear;
  const [minVal, setMinVal] = useState<number>(min);
  const [maxVal, setMaxVal] = useState<number>(max);
  const [filterCondition, setFilterCondition] = useState(false);
  const [switchYear, setSwitchYear] = useState('single');

  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');
  const [sort, setSort] = useState('publish_at:desc');
  const [perPage, setPerPage] = useState(15);
  const [authorFilter, setAuthorFilter] = useState('');
  const [publisherFilter, setPublisherFilter] = useState('');
  const [topicFilter, setTopicFilter] = useState('');
  const [singleYearFilter, setSingleYearFilter] = useState('');
  const [searchWithinQuery, setSearchWithinQuery] = useState('');
  const query = router.query;

  const swithHandler = (value: string): void => {
    if (value === 'range') {
      setSingleYearFilter('');
    }
    setSwitchYear(value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortBy = e.target.value;
    setSort(sortBy);

    let sortField = '';
    let sortOrder = '';

    if (sortBy === 'title:desc') {
      sortField = 'title';
      sortOrder = 'desc';
    } else if (sortBy === 'relevance') {
      sortField = 'relevance';
    } else if (sortBy === 'title:asc') {
      sortField = 'title';
      sortOrder = 'asc';
    } else if (sortBy === 'publish_at:asc') {
      sortField = 'publish_at';
      sortOrder = 'asc';
    } else if (sortBy === 'publish_at:desc') {
      sortField = 'publish_at';
      sortOrder = 'desc';
    }

    const currentQuery = { ...query };

    if (sortField === 'relevance') {
      currentQuery.sort_field = sortField;
    } else {
      currentQuery.sort_field = sortField;
      currentQuery.sort_order = sortOrder;
    }

    router.push({
      pathname: router.pathname,
      query: currentQuery,
    });
  };

  const handlePageShow = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const showPage = parseInt(e.target.value);
    setPerPage(showPage);

    const currentQuery = { ...query };
    currentQuery.per_page = showPage.toString();

    router.push({
      pathname: router.pathname,
      query: currentQuery,
    });
  };

  const creatorFilterhandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    setAuthorFilter(value);

    const currentQuery = { ...query };
    currentQuery.author_filter = value;
    setFilterCondition(true);

    router.push({
      pathname: router.pathname,
      query: currentQuery,
    });
  };

  const publisherFilterhandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    setPublisherFilter(value);

    const currentQuery = { ...query };
    currentQuery.journal_filter = value;
    setFilterCondition(true);

    router.push({
      pathname: router.pathname,
      query: currentQuery,
    });
  };

  const topicFilterhandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    setTopicFilter(value);

    const currentQuery = { ...query };
    currentQuery.subject_filter = value;
    setFilterCondition(true);

    router.push({
      pathname: router.pathname,
      query: currentQuery,
    });
  };

  const singleYearhandler = () => {
    const currentQuery = { ...query };
    if (currentQuery.rangeYear) {
      currentQuery.singleYear = singleYearFilter;
      delete currentQuery.rangeYear;
    } else {
      currentQuery.singleYear = singleYearFilter;
    }
    setFilterCondition(true);

    router.push({
      pathname: router.pathname,
      query: currentQuery,
    });
  };

  const rangeYearhandler = () => {
    const currentQuery = { ...query };
    if (currentQuery.singleYear) {
      currentQuery.rangeYear = minVal + '_' + maxVal;
      delete currentQuery.singleYear;
    } else {
      currentQuery.rangeYear = minVal + '_' + maxVal;
    }
    setFilterCondition(true);

    router.push({
      pathname: router.pathname,
      query: currentQuery,
    });
  };

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  );

  const searchWithHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const currentQuery = { ...query };

    if (currentQuery['search']) {
      currentQuery[`searchWithin`] = searchWithinQuery;
    } else {
      currentQuery[`search`] = searchWithinQuery;
    }

    router.push({
      pathname: router.pathname,
      query: currentQuery,
    });
  };

  const resetFilter = () => {
    const currentQuery = { ...query };

    const resetQuery: any = {};

    setSearchKeyword('');
    setSearchAuthor('');
    setAuthorFilter('');
    setPublisherFilter('');
    setTopicFilter('');
    setSingleYearFilter('');
    setSearchWithinQuery('');
    setFilterCondition(false);

    if (currentQuery.sort_field) {
      resetQuery.sort_field = currentQuery.sort_field;
    }

    if (currentQuery.sort_order) {
      resetQuery.sort_order = currentQuery.sort_order;
    }

    if (currentQuery.per_page) {
      resetQuery.per_page = currentQuery.per_page;
    }

    if (currentQuery.page) {
      resetQuery.page = currentQuery.page;
    }

    router.push({ pathname: router.pathname, query: resetQuery });
  };

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

  const deleteQuery = (queryPath: string) => {
    const currentQuery = { ...query };

    if (currentQuery[queryPath]) {
      delete currentQuery[queryPath];
    }

    router.push({ pathname: router.pathname, query: currentQuery });
  };

  useEffect(() => {
    fetch(`/api/articles`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setArticles(data.data);
      });
  }, []);

  useEffect(() => {
    const {
      journal_filter,
      singleYear,
      rangeYear,
      search,
      searchWithin,
      advancedQuery,
      author_filter,
      subject_filter,
    } = query as {
      page: string;
      per_page: string;
      sort_field: string;
      sort_order: string;
      search: string;
      journal_filter: string;
      singleYear: string;
      rangeYear: string;
      searchWithin: string;
      advancedQuery: string;
      author_filter: string;
      subject_filter: string;
    };

    if (!authorFilter) {
      setAuthorFilter(author_filter || '');
    }

    if (!publisherFilter) {
      setPublisherFilter(journal_filter || '');
    }

    if (!singleYearFilter) {
      setSingleYearFilter(singleYear || '');
    }

    if (!searchWithinQuery) {
      setSearchWithinQuery(searchWithin || '');
    }

    if (!topicFilter) {
      setTopicFilter(subject_filter || '');
    }

    if (!minVal && !maxVal && rangeYear) {
      const [min, max] = rangeYear.split('_').map(Number);
      setMinVal(min);
      setMaxVal(max);
      setSwitchYear('range');
    }

    setFilterCondition(
      !!journal_filter ||
        !!singleYear ||
        !!rangeYear ||
        !!search ||
        !!searchWithin ||
        !!advancedQuery,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const params = query as {
      page: string;
      per_page: string;
      sort_field: string;
      sort_order: string;
      search: string;
      author_filter: string;
      journal_filter: string;
      subject_filter: string;
      singleYear: string;
      rangeYear: string;
      searchWithin: string;
      advancedQuery: string;
    };

    const queryParams = {
      page: query.page || (1 as number),
      per_page: query.per_page || (15 as number),
      sort_field: query.sort_field || ('publish_at' as string),
      sort_order: query.sort_order || ('desc' as string),
      search: query.search || (undefined as string | undefined),
      author_filter: query.author_filter || (undefined as string | undefined),
      journal_filter: query.journal_filter || (undefined as string | undefined),
      subject_filter: query.subject_filter || (undefined as string | undefined),
      singleYear: query.singleYear || (undefined as string | undefined),
      rangeYear: query.rangeYear || (undefined as string | undefined),
      searchWithin: query.searchWithin || (undefined as string | undefined),
      advancedQuery: query.advancedQuery || (undefined as string | undefined),
    };

    const nonEmptyQueryParams = Object.fromEntries(
      Object.entries(queryParams).filter(([key, value]) => value !== undefined),
    );

    const { rangeYear, ...restQueryParams } = nonEmptyQueryParams;

    const urlSearchParams = new URLSearchParams(
      restQueryParams as Record<string, string>,
    );

    let apiUrl = `api/articles?${urlSearchParams.toString()}`;

    if (rangeYear) {
      const [minVal, maxVal] = rangeYear.toString().split('_');
      apiUrl += `&minYear=${minVal}&maxYear=${maxVal}`;
    }

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setArticles(data.data);
      });
  }, [query]);

  return (
    <>
      <NextSeo title="Articles | IPMUGO Digital Library" />
      <HeroSection />

      {loading ? (
        <>
          <div className="min-h-screen">
            <Loading />
          </div>
        </>
      ) : (
        <section className="container">
          <div className="pt-6 pb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
              <div className="relative h-full w-full overflow-hidden row-span-2 flex flex-col gap-4">
                <div className="top-0 sticky">
                  <form onSubmit={searchWithHandler} className="relative">
                    <input
                      type="text"
                      placeholder="Search within results ... "
                      name="seach"
                      value={searchWithinQuery}
                      onChange={(e) => setSearchWithinQuery(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg outline-none bg-slate-100/30 text-slate-900"
                    />
                    <button className="w-6 h-6 absolute right-2 top-3 text-slate-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        viewBox="0 0 24 24"
                        fill="none">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.5 3.75C6.77208 3.75 3.75 6.77208 3.75 10.5C3.75 14.2279 6.77208 17.25 10.5 17.25C12.3642 17.25 14.0506 16.4953 15.273 15.273C16.4953 14.0506 17.25 12.3642 17.25 10.5C17.25 6.77208 14.2279 3.75 10.5 3.75ZM2.25 10.5C2.25 5.94365 5.94365 2.25 10.5 2.25C15.0563 2.25 18.75 5.94365 18.75 10.5C18.75 12.5078 18.032 14.3491 16.8399 15.7793L21.5303 20.4697C21.8232 20.7626 21.8232 21.2374 21.5303 21.5303C21.2374 21.8232 20.7626 21.8232 20.4697 21.5303L15.7793 16.8399C14.3491 18.032 12.5078 18.75 10.5 18.75C5.94365 18.75 2.25 15.0563 2.25 10.5Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </form>

                  <form className="mt-10 flex flex-col gap-4">
                    <div>
                      <div className="h-12 w-40 bg-slate-200 rounded-full relative flex justify-center items-center overflow-hidden transition-all duration-150">
                        <div
                          className={`absolute top-0 bottom-0  bg-indigo-700 w-[50%] rounded-full transition-all duration-150 ${
                            switchYear === 'single' ? 'left-0' : 'right-0'
                          }`}></div>
                        <div
                          onClick={(e) => swithHandler('single')}
                          className={`flex-1 h-full w-full flex items-center justify-center font-medium cursor-pointer transition-all duration-150 rounded-full relative z-0 ${
                            switchYear === 'single'
                              ? 'text-white'
                              : 'text-slate-900'
                          }`}>
                          Single
                        </div>
                        <div
                          onClick={() => swithHandler('range')}
                          className={`flex-1 h-full w-full flex items-center justify-center font-medium cursor-pointer transition-all duration-150 rounded-full relative z-0 ${
                            switchYear === 'range'
                              ? 'text-white'
                              : 'text-slate-900'
                          }`}>
                          Range
                        </div>
                      </div>
                      <p className="mt-4 font-medium">Year</p>

                      {switchYear === 'range' ? (
                        <>
                          <div className="relative mt-4 w-full flex justify-between">
                            <input
                              type="range"
                              min={min}
                              max={max}
                              value={minVal}
                              ref={minValRef}
                              onChange={(
                                event: ChangeEvent<HTMLInputElement>,
                              ) => {
                                const value = Math.min(
                                  +event.target.value,
                                  maxVal - 1,
                                );
                                setMinVal(value);
                                event.target.value = value.toString();
                              }}
                              className={classnames('thumb thumb--zindex-3', {
                                'thumb--zindex-5': minVal > max - 100,
                              })}
                            />
                            <input
                              type="range"
                              min={min}
                              max={max}
                              value={maxVal}
                              ref={maxValRef}
                              onChange={(
                                event: ChangeEvent<HTMLInputElement>,
                              ) => {
                                const value = Math.max(
                                  +event.target.value,
                                  minVal + 1,
                                );
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
                            <input
                              type="text"
                              placeholder="Search within results ... "
                              name="min"
                              value={minVal}
                              onChange={(e) =>
                                setMinVal(parseInt(e.target.value))
                              }
                              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg outline-none bg-slate-100/30 text-slate-900"
                            />
                            <input
                              type="text"
                              placeholder="Search within results ... "
                              name="max"
                              value={maxVal}
                              onChange={(e) =>
                                setMaxVal(parseInt(e.target.value))
                              }
                              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg outline-none bg-slate-100/30 text-slate-900"
                            />
                          </div>

                          {minVal && maxVal ? (
                            <div className="relative mt-4 w-full flex justify-between">
                              <ButtonPrimary
                                onClick={rangeYearhandler}
                                type="button">
                                Filter
                              </ButtonPrimary>
                            </div>
                          ) : (
                            ''
                          )}
                        </>
                      ) : (
                        <>
                          <div className="relative mt-4 w-full flex justify-between">
                            <input
                              type="text"
                              name="singleYear"
                              value={singleYearFilter}
                              onChange={(e) =>
                                setSingleYearFilter(e.target.value)
                              }
                              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg outline-none bg-slate-100/30 text-slate-900"
                            />
                          </div>

                          {singleYearFilter !== '' ? (
                            <div className="relative mt-4 w-full flex justify-between">
                              <ButtonPrimary
                                onClick={singleYearhandler}
                                type="button">
                                Filter
                              </ButtonPrimary>
                            </div>
                          ) : (
                            ''
                          )}
                        </>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">Author</p>
                      <input
                        type="text"
                        placeholder="Find Author"
                        value={searchAuthor}
                        onChange={(e) => setSearchAuthor(e.target.value)}
                        className="mt-4 w-full px-4 py-3 border-2 border-slate-200 rounded-lg outline-none bg-slate-100/30 text-slate-900"
                      />
                      <div className="mt-4 flex flex-col gap-y-1 max-h-[300px] overflow-y-scroll scroll-smooth scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-400 scrollbar-thumb-rounded-lg scrollbar-w-1">
                        {articles?.aggrs.creators
                          .filter((subject: any) =>
                            subject._id
                              .toLowerCase()
                              .includes(searchAuthor.toLowerCase()),
                          )
                          .map((creator: any, index: number) => (
                            <div
                              key={index}
                              className="flex justify-start items-center gap-4 relative">
                              <input
                                type="radio"
                                value={authorFilter}
                                name="creator"
                                onChange={(e) =>
                                  creatorFilterhandler(e, creator._id)
                                }
                                checked={authorFilter === creator._id}
                                className=" relative flex justify-center items-center peer shrink-0 appearance-none w-5 h-5 border-2 border-indigo-200 rounded-md bg-white mt-1 checked:bg-indigo-700 checked:border-0"
                              />
                              <label>{creator._id}</label>
                              <svg
                                className="absolute w-4 h-4 mt-[3px] mx-0.5 peer-checked:flex justify-center items-center hidden pointer-events-none"
                                xmlns="http://www.w3.org/2000/svg"
                                width="100%"
                                height="100%"
                                viewBox="0 0 24 24"
                                fill="none">
                                <path
                                  d="M10.5 1.875C10.5 1.25368 11.0037 0.75 11.625 0.75C12.2463 0.75 12.75 1.25368 12.75 1.875V10.0938C13.2674 10.2561 13.7708 10.4757 14.25 10.7527V3.375C14.25 2.75368 14.7537 2.25 15.375 2.25C15.9963 2.25 16.5 2.75368 16.5 3.375V14.3122C15.0821 14.5501 13.8891 15.451 13.2506 16.6852C14.4554 16.0866 15.8134 15.75 17.25 15.75C17.6642 15.75 18 15.4142 18 15V12.75L18 12.7336C18.0042 11.8771 18.3339 11.0181 18.9885 10.3635C19.4278 9.92417 20.1402 9.92417 20.5795 10.3635C21.0188 10.8028 21.0188 11.5152 20.5795 11.9545C20.361 12.173 20.2514 12.4567 20.25 12.7445L20.25 12.75L20.25 15.75H20.2454C20.1863 17.2558 19.5623 18.6877 18.4926 19.7574L16.7574 21.4926C15.6321 22.6179 14.106 23.25 12.5147 23.25H10.5C6.35786 23.25 3 19.8921 3 15.75V6.375C3 5.75368 3.50368 5.25 4.125 5.25C4.74632 5.25 5.25 5.75368 5.25 6.375V11.8939C5.71078 11.4421 6.2154 11.0617 6.75 10.7527V3.375C6.75 2.75368 7.25368 2.25 7.875 2.25C8.49632 2.25 9 2.75368 9 3.375V9.90069C9.49455 9.80023 9.99728 9.75 10.5 9.75V1.875Z"
                                  fill="#fff"
                                />
                              </svg>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Publication Title</p>
                      <div className="mt-4 flex flex-col gap-y-1 max-h-[300px] overflow-y-scroll scroll-smooth scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-400 scrollbar-thumb-rounded-lg scrollbar-w-1">
                        {articles?.aggrs.journal.map(
                          (journal: any, index: number) => (
                            <div
                              key={index}
                              className="flex justify-start items-center gap-4 relative">
                              <input
                                type="radio"
                                value={publisherFilter}
                                name="publisher"
                                onChange={(e) =>
                                  publisherFilterhandler(e, journal._id)
                                }
                                checked={publisherFilter === journal._id}
                                className=" relative flex justify-center items-center peer shrink-0 appearance-none w-5 h-5 border-2 border-indigo-200 rounded-md bg-white mt-1 checked:bg-indigo-700 checked:border-0"
                              />
                              <label>{journal._id}</label>
                              <svg
                                className="absolute w-4 h-4 mt-[3px] mx-0.5 peer-checked:flex justify-center items-center hidden pointer-events-none"
                                xmlns="http://www.w3.org/2000/svg"
                                width="100%"
                                height="100%"
                                viewBox="0 0 24 24"
                                fill="none">
                                <path
                                  d="M10.5 1.875C10.5 1.25368 11.0037 0.75 11.625 0.75C12.2463 0.75 12.75 1.25368 12.75 1.875V10.0938C13.2674 10.2561 13.7708 10.4757 14.25 10.7527V3.375C14.25 2.75368 14.7537 2.25 15.375 2.25C15.9963 2.25 16.5 2.75368 16.5 3.375V14.3122C15.0821 14.5501 13.8891 15.451 13.2506 16.6852C14.4554 16.0866 15.8134 15.75 17.25 15.75C17.6642 15.75 18 15.4142 18 15V12.75L18 12.7336C18.0042 11.8771 18.3339 11.0181 18.9885 10.3635C19.4278 9.92417 20.1402 9.92417 20.5795 10.3635C21.0188 10.8028 21.0188 11.5152 20.5795 11.9545C20.361 12.173 20.2514 12.4567 20.25 12.7445L20.25 12.75L20.25 15.75H20.2454C20.1863 17.2558 19.5623 18.6877 18.4926 19.7574L16.7574 21.4926C15.6321 22.6179 14.106 23.25 12.5147 23.25H10.5C6.35786 23.25 3 19.8921 3 15.75V6.375C3 5.75368 3.50368 5.25 4.125 5.25C4.74632 5.25 5.25 5.75368 5.25 6.375V11.8939C5.71078 11.4421 6.2154 11.0617 6.75 10.7527V3.375C6.75 2.75368 7.25368 2.25 7.875 2.25C8.49632 2.25 9 2.75368 9 3.375V9.90069C9.49455 9.80023 9.99728 9.75 10.5 9.75V1.875Z"
                                  fill="#fff"
                                />
                              </svg>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Topic</p>
                      <input
                        type="text"
                        placeholder="Find Topic"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        className="mt-4 w-full px-4 py-3 border-2 border-slate-200 rounded-lg outline-none bg-slate-100/30 text-slate-900"
                      />
                      <div className="mt-4 flex flex-col gap-y-1 max-h-[300px] overflow-y-scroll scroll-smooth scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-400 scrollbar-thumb-rounded-lg scrollbar-w-1">
                        {articles?.aggrs.subjects
                          .filter((subject: any) =>
                            subject._id
                              .toLowerCase()
                              .includes(searchKeyword.toLowerCase()),
                          )
                          .map((subject: any, index: number) =>
                            subject._id !== '' ? (
                              <div
                                key={index}
                                className="flex justify-start items-center gap-4 relative">
                                <input
                                  type="radio"
                                  value={topicFilter}
                                  name="topic"
                                  onChange={(e) =>
                                    topicFilterhandler(e, subject._id)
                                  }
                                  checked={topicFilter === subject._id}
                                  className=" relative flex justify-center items-center peer shrink-0 appearance-none w-5 h-5 border-2 border-indigo-200 rounded-md bg-white mt-1 checked:bg-indigo-700 checked:border-0"
                                />
                                <label>{subject._id}</label>
                                <svg
                                  className="absolute w-4 h-4 mt-[3px] mx-0.5 peer-checked:flex justify-center items-center hidden pointer-events-none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="100%"
                                  height="100%"
                                  viewBox="0 0 24 24"
                                  fill="none">
                                  <path
                                    d="M10.5 1.875C10.5 1.25368 11.0037 0.75 11.625 0.75C12.2463 0.75 12.75 1.25368 12.75 1.875V10.0938C13.2674 10.2561 13.7708 10.4757 14.25 10.7527V3.375C14.25 2.75368 14.7537 2.25 15.375 2.25C15.9963 2.25 16.5 2.75368 16.5 3.375V14.3122C15.0821 14.5501 13.8891 15.451 13.2506 16.6852C14.4554 16.0866 15.8134 15.75 17.25 15.75C17.6642 15.75 18 15.4142 18 15V12.75L18 12.7336C18.0042 11.8771 18.3339 11.0181 18.9885 10.3635C19.4278 9.92417 20.1402 9.92417 20.5795 10.3635C21.0188 10.8028 21.0188 11.5152 20.5795 11.9545C20.361 12.173 20.2514 12.4567 20.25 12.7445L20.25 12.75L20.25 15.75H20.2454C20.1863 17.2558 19.5623 18.6877 18.4926 19.7574L16.7574 21.4926C15.6321 22.6179 14.106 23.25 12.5147 23.25H10.5C6.35786 23.25 3 19.8921 3 15.75V6.375C3 5.75368 3.50368 5.25 4.125 5.25C4.74632 5.25 5.25 5.75368 5.25 6.375V11.8939C5.71078 11.4421 6.2154 11.0617 6.75 10.7527V3.375C6.75 2.75368 7.25368 2.25 7.875 2.25C8.49632 2.25 9 2.75368 9 3.375V9.90069C9.49455 9.80023 9.99728 9.75 10.5 9.75V1.875Z"
                                    fill="#fff"
                                  />
                                </svg>
                              </div>
                            ) : (
                              ''
                            ),
                          )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="md:col-span-2 lg:col-span-3">
                <div className="flex flex-wrap justify-between mb-5">
                  <div className="text-lg">
                    Showing{' '}
                    <span className="font-medium">
                      {articles?.current_page | 0}-{articles?.total_pages | 0}{' '}
                      of {articles?.total | 0}
                    </span>{' '}
                    results
                  </div>
                  <div className="flex justify-end gap-3 items-center">
                    <div className="text-sm">
                      Sort By{' '}
                      <select
                        value={sort}
                        onChange={handleSort}
                        className="outline-none bg-slate-50 pl-2 py-2 rounded-lg">
                        <option value="relevance">Relevance </option>
                        <option value="publish_at:desc">Newest</option>
                        <option value="publish_at:asc">Oldest</option>
                        <option value="title:asc">Publication Title A-Z</option>
                        <option value="title:desc">
                          Publication Title Z-A
                        </option>
                      </select>
                    </div>
                    <div className="text-sm">
                      <select
                        value={perPage}
                        onChange={handlePageShow}
                        className="outline-none bg-slate-50 pl-2 py-2 rounded-lg">
                        <option value={15}>15</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={75}>75</option>
                        <option value={100}>100</option>
                      </select>
                    </div>
                    {filterCondition && (
                      <ButtonPrimary onClick={resetFilter} type="button">
                        Reset Filter
                      </ButtonPrimary>
                    )}
                  </div>
                </div>
                {query.search ||
                query.author_filter ||
                query.journal_filter ||
                query.subject_filter ||
                query.singleYear ||
                query.rangeYear ||
                query.searchWithin ||
                query.advancedQuery ? (
                  <div className="relative shadow-inner pb-3 pt-8 flex justify-start items-start gap-3 px-4 rounded-lg">
                    <div className="absolute shadow-inner -top-2.5 bg-white font-normal px-3 py-1 text-sm rounded-lg left-1">
                      Filter
                    </div>
                    {[
                      'search',
                      'author_filter',
                      'journal_filter',
                      'subject_filter',
                      'singleYear',
                      'rangeYear',
                      'searchWithin',
                      'advancedQuery',
                    ].map((filterKey, index) => (
                      <>
                        {query[filterKey] && (
                          <p className="bg-slate-50 px-4 py-2.5 relative">
                            {query[filterKey]}
                            <button
                              key={index}
                              onClick={(e) => deleteQuery(filterKey)}
                              className="p-0.5 absolute -top-2 -right-2 bg-white rounded-lg shadow-inner">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none">
                                <path
                                  d="M6.28033 5.21967C5.98744 4.92678 5.51256 4.92678 5.21967 5.21967C4.92678 5.51256 4.92678 5.98744 5.21967 6.28033L8.93934 10L5.21967 13.7197C4.92678 14.0126 4.92678 14.4874 5.21967 14.7803C5.51256 15.0732 5.98744 15.0732 6.28033 14.7803L10 11.0607L13.7197 14.7803C14.0126 15.0732 14.4874 15.0732 14.7803 14.7803C15.0732 14.4874 15.0732 14.0126 14.7803 13.7197L11.0607 10L14.7803 6.28033C15.0732 5.98744 15.0732 5.51256 14.7803 5.21967C14.4874 4.92678 14.0126 4.92678 13.7197 5.21967L10 8.93934L6.28033 5.21967Z"
                                  fill="#0F172A"
                                />
                              </svg>
                            </button>
                          </p>
                        )}
                      </>
                    ))}
                  </div>
                ) : (
                  <></>
                )}

                <div className="mt-8 grid grid-cols-3 gap-5">
                  {articles?.articles.map((article: any, index: number) => (
                    <ArticleCard
                      key={index}
                      title={article.title}
                      href={article._id}
                      topic={article.subjects}
                      image={article.thumbnail}
                      journalName={article.journal.abbreviation}
                    />
                  ))}
                </div>
                <div className="mt-10 flex justify-end">
                  <Pagination
                    currentPage={articles?.current_page}
                    totalPages={articles?.total_pages}
                    perPage={perPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <CTA />
    </>
  );
};
export default Articles;
Articles.Layout = 'Main';
