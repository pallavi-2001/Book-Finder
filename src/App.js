import { useState } from "react";
import axios from "axios";
import "./styles.css";

export default function BookFinder() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [authorFilter, setAuthorFilter] = useState("");
  const [publisherFilter, setPublisherFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [minEditions, setMinEditions] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [message, setMessage] = useState("");

  // ✅ New: occupation state + suggestions
  const [occupation, setOccupation] = useState("");

  const suggestionsByOccupation = {
    "College Student": [
      "Programming",
      "Self Improvement",
      "Study Skills",
      "Career Development",
      "Machine Learning",
      "Motivational Reads",
    ],
    "Home Wender": [
      "Cooking",
      "Gardening",
      "Home Decoration",
      "Parenting",
      "Budget Planning",
      "Healthy Living",
    ],
    "Outdoor Enthusiast": [
      "Travel",
      "Adventure",
      "Camping",
      "Wildlife",
      "Nature Exploration",
      "Hiking",
    ],
    "Busy Professional": [
      "Time Management",
      "Leadership",
      "Mindfulness",
      "Productivity",
      "Business Strategy",
      "Stress Management",
    ],
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setMessage("Please enter a book title.");
      return;
    }

    setMessage("Searching...");
    setBooks([]);
    setFilteredBooks([]);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${query}`
      );
      const data = await response.json();

      if (data.docs.length === 0) {
        setMessage("No books found. Try another title.");
        return;
      }

      setBooks(data.docs);
      setFilteredBooks(data.docs);
      setMessage(`Found ${data.numFound} results`);
    } catch (error) {
      setMessage("Something went wrong. Please try again later.");
    }
  };

  // Combined filter + sorting logic
  const applyFiltersAndSort = (
    author,
    publisher,
    language,
    subject,
    minEditions,
    yearFrom,
    yearTo,
    sort
  ) => {
    let filtered = [...books];

    if (author) {
      filtered = filtered.filter((book) =>
        book.author_name?.some((name) =>
          name.toLowerCase().includes(author.toLowerCase())
        )
      );
    }

    if (publisher) {
      filtered = filtered.filter((book) =>
        book.publisher?.some((pub) =>
          pub.toLowerCase().includes(publisher.toLowerCase())
        )
      );
    }

    if (language) {
      filtered = filtered.filter((book) =>
        book.language?.some((lang) =>
          lang.toLowerCase().includes(language.toLowerCase())
        )
      );
    }

    if (subject) {
      filtered = filtered.filter((book) =>
        book.subject?.some((s) =>
          s.toLowerCase().includes(subject.toLowerCase())
        )
      );
    }

    if (minEditions) {
      filtered = filtered.filter(
        (book) =>
          book.edition_count && book.edition_count >= parseInt(minEditions)
      );
    }

    if (yearFrom || yearTo) {
      filtered = filtered.filter((book) => {
        const year = book.first_publish_year || 0;
        return (
          (!yearFrom || year >= parseInt(yearFrom)) &&
          (!yearTo || year <= parseInt(yearTo))
        );
      });
    }

    if (sort === "title") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "year") {
      filtered.sort(
        (a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0)
      );
    } else if (sort === "editions") {
      filtered.sort((a, b) => (b.edition_count || 0) - (a.edition_count || 0));
    }

    setFilteredBooks(filtered);
  };

  const handleAuthorChange = (value) => {
    setAuthorFilter(value);
    applyFiltersAndSort(
      value,
      publisherFilter,
      languageFilter,
      subjectFilter,
      minEditions,
      yearFrom,
      yearTo,
      sortOption
    );
  };

  const handlePublisherChange = (value) => {
    setPublisherFilter(value);
    applyFiltersAndSort(
      authorFilter,
      value,
      languageFilter,
      subjectFilter,
      minEditions,
      yearFrom,
      yearTo,
      sortOption
    );
  };

  const handleLanguageChange = (value) => {
    setLanguageFilter(value);
    applyFiltersAndSort(
      authorFilter,
      publisherFilter,
      value,
      subjectFilter,
      minEditions,
      yearFrom,
      yearTo,
      sortOption
    );
  };

  const handleSubjectChange = (value) => {
    setSubjectFilter(value);
    applyFiltersAndSort(
      authorFilter,
      publisherFilter,
      languageFilter,
      value,
      minEditions,
      yearFrom,
      yearTo,
      sortOption
    );
  };

  const handleEditionChange = (value) => {
    setMinEditions(value);
    applyFiltersAndSort(
      authorFilter,
      publisherFilter,
      languageFilter,
      subjectFilter,
      value,
      yearFrom,
      yearTo,
      sortOption
    );
  };

  const handleYearRangeChange = (from, to) => {
    setYearFrom(from);
    setYearTo(to);
    applyFiltersAndSort(
      authorFilter,
      publisherFilter,
      languageFilter,
      subjectFilter,
      minEditions,
      from,
      to,
      sortOption
    );
  };

  const handleSortChange = (value) => {
    setSortOption(value);
    applyFiltersAndSort(
      authorFilter,
      publisherFilter,
      languageFilter,
      subjectFilter,
      minEditions,
      yearFrom,
      yearTo,
      value
    );
  };

  const clearFilters = () => {
    setAuthorFilter("");
    setPublisherFilter("");
    setLanguageFilter("");
    setSubjectFilter("");
    setMinEditions("");
    setYearFrom("");
    setYearTo("");
    setSortOption("");
    setFilteredBooks(books);
  };

  return (
    <div className="container">
      <h1>📚 Book Finder</h1>

      {/* ✅ Occupation-based Suggestions */}
      <h2>Please Select occupation for better suggestion</h2>
      <div className="occupation-section">
        <select
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
        >
          <option value="">Select Occupation</option>
          <option value="College Student">College Student</option>
          <option value="Home Wender">Home Workers</option>
          <option value="Outdoor Enthusiast">Outdoor Enthusiast</option>
          <option value="Busy Professional">Busy Professional</option>
        </select>

        {occupation && (
          <div className="suggestions">
            <p>📖 Suggested topics for {occupation}:</p>
            <div className="tags">
              {suggestionsByOccupation[occupation].map((topic, index) => (
                <button key={index} onClick={() => setQuery(topic)}>
                  {topic}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ✅ Search Box */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter book title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="message">{message}</div>

      {books.length > 0 && (
        <>
          <div className="filters">
            <input
              type="text"
              placeholder="Filter by author..."
              value={authorFilter}
              onChange={(e) => handleAuthorChange(e.target.value)}
            />
            <input
              type="text"
              placeholder="Filter by publisher..."
              value={publisherFilter}
              onChange={(e) => handlePublisherChange(e.target.value)}
            />
            <select
              value={languageFilter}
              onChange={(e) => handleLanguageChange(e.target.value)}
            >
              <option value="">All Languages</option>
              <option value="eng">English</option>
              <option value="fre">French</option>
              <option value="spa">Spanish</option>
              <option value="ger">German</option>
              <option value="ita">Italian</option>
            </select>
            <input
              type="text"
              placeholder="Filter by subject (e.g. fiction, history)..."
              value={subjectFilter}
              onChange={(e) => handleSubjectChange(e.target.value)}
            />
            <input
              type="number"
              placeholder="Min editions (e.g. 2)"
              value={minEditions}
              onChange={(e) => handleEditionChange(e.target.value)}
            />
            <div className="year-range">
              <input
                type="number"
                placeholder="From Year"
                value={yearFrom}
                onChange={(e) => handleYearRangeChange(e.target.value, yearTo)}
              />
              <input
                type="number"
                placeholder="To Year"
                value={yearTo}
                onChange={(e) =>
                  handleYearRangeChange(yearFrom, e.target.value)
                }
              />
            </div>

            <select
              value={sortOption}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="title">Title (A–Z)</option>
              <option value="year">Newest First</option>
              <option value="editions">Most Editions</option>
            </select>

            <button type="button" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>

          <div className="grid">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book, index) => (
                <div key={index} className="card">
                  {book.cover_i ? (
                    <img
                      src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                      alt={book.title}
                    />
                  ) : (
                    <img
                      src="https://via.placeholder.com/150x220?text=No+Cover"
                      alt="No cover"
                    />
                  )}
                  <h2>{book.title}</h2>
                  <p>
                    <strong>Author:</strong>{" "}
                    {book.author_name ? book.author_name.join(", ") : "Unknown"}
                  </p>
                  <p>
                    <strong>Publisher:</strong>{" "}
                    {book.publisher ? book.publisher[0] : "N/A"}
                  </p>
                  <p>
                    <strong>Year:</strong> {book.first_publish_year || "N/A"}
                  </p>
                  <p>
                    <strong>Language:</strong>{" "}
                    {book.language ? book.language.join(", ") : "N/A"}
                  </p>
                  <p>
                    <strong>Editions:</strong> {book.edition_count || "N/A"}
                  </p>
                </div>
              ))
            ) : (
              <div className="no-results">No results match your filters.</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
