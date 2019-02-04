import * as React from "react";
import './QuotesBox.scss';
import { QUERY_RANDOM_QUOTE_SUCCESS } from "../../../constans";

interface IQuotesBox {
  quoteProps: any,
  dispatchQuotes: any,
}

class QuotesBox extends React.Component<IQuotesBox> {
  constructor(props: IQuotesBox) {
    super(props);
  }

  queryRandomQuote = () => {
    const api = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
    this.getQuotes(api);
    setInterval(() => {
      this.getQuotes(api);
    }, 10000);
  }

  private getQuotes(api: string) {
    fetch(api)
      .then((response: any) => response.json())
      .then((object: any) => {
        const quotes = object.quotes;
        const random = Math.floor(Math.random() * quotes.length);
        this.props.dispatchQuotes(QUERY_RANDOM_QUOTE_SUCCESS, { quoteContent: quotes[random].quote, quoteAuthor: quotes[random].author });
      })
      .catch((error: any) => {
        console.log('query quote fail. Error log:\n', error);
      });
  }

  componentDidMount() {
    this.queryRandomQuote();
  }

  render(): JSX.Element {
    const { quoteContent, quoteAuthor } = this.props.quoteProps;

    return (
      <div className="container" id="quote-box">
        <div className="text-center" id="quote">
          <h5>{quoteContent}</h5>
        </div>
        <div className="text-right" id="author">
          <p>- {quoteAuthor}</p>
        </div>
      </div>
    );
  }
}

export default QuotesBox;

