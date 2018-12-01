import React from "react";
import PhotoCard from "./PhotoCard";
import { observer, inject } from "mobx-react";
import RequestStateLoader from "./loader/RequestStateLoader";
import Paginator from "./Paginator";
import SearchFilter from "./filter/SearchFilter";
import SortFilter from "./filter/SortFilter";
import { Alert } from "reactstrap";

@inject("photoStore")
@observer
class Gallery extends React.Component {
  state = {
    query: {
      page: 1,
      search: "",
      ordering: "timestamp"
    }
  };

  componentDidMount() {
    this.loadPhotos();
  }

  componentWillReceiveProps() {
    this.loadPhotos();
  }

  loadPhotos = () => {
    this.props.photoStore.loadPhotos(this.getQuery());
  };

  getQuery = () => {
    return {
      ...this.props.query,
      ...this.state.query
    };
  };

  setLocalQueryParam = (param, value) => {
    this.setState(
      (state) => ({
        query: {
          ...state.query,
          [param]: value
        }
      }),
      this.loadPhotos
    );
  };

  selectPage = (page) => {
    this.setLocalQueryParam("page", page);
  };

  setSearch = (search) => {
    this.setLocalQueryParam("page", 1);
    this.setLocalQueryParam("search", search);
  };

  setSort = (sort) => {
    this.setLocalQueryParam("ordering", sort);
  };

  render() {
    const query = this.getQuery();
    const result = this.props.photoStore.getResultsForQuery(query);
    const state = this.props.photoStore.getStatusForQuery(query);

    return (
      <div className="Gallery">
        <div className="Gallery__filters">
          <SearchFilter onConfirm={this.setSearch} />
          <SortFilter
            onConfirm={this.setSort}
            options={[
              { value: "timestamp", label: "Date (ascending)" },
              { value: "-timestamp", label: "Date (descending)" },
              { value: "name", label: "Name (A-Z)" },
              { value: "-name", label: "Name (Z-A)" },
              { value: "filesize", label: "File size (ascending)" },
              { value: "-filesize", label: "File size (descending)" }
            ]}
          />
        </div>

        <RequestStateLoader
          state={state}
          loaded={() => (
            <div className="Gallery__data">
              {this.state.query.search &&
                this.state.query.search.length > 0 && (
                  <div className="Gallery__filter-note text-muted">
                    Filtering by "{this.state.query.search}" active.
                  </div>
                )}
              <div className="Gallery__photos">
                {result.results.map((photo) => (
                  <PhotoCard key={photo.name} photo={photo} />
                ))}
              </div>
              {result.results.length === 0 && (
                <Alert color="warning">No matching photos were found.</Alert>
              )}
              <Paginator
                currentPage={this.state.query.page}
                totalPages={result.totalPages}
                selectPage={this.selectPage}
              />
            </div>
          )}
        />
      </div>
    );
  }
}

export default Gallery;
