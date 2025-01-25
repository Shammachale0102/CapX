 Portfolio Tracker

 
 Build a Simple Portfolio Tracker application that allows users to:


 
1. Add, view, edit, and delete stock holdings.
2. Track the total portfolio value based on real-time stock prices.
3. View a dashboard displaying key portfolio metrics (e.g., total value,
top-performing stock, portfolio distribution).


Requirements:

Frontend:


● Build a responsive web application using React (preferred) or any modern
frontend framework.
● The interface should include:
○ A dashboard showing portfolio metrics.
○ A form to add/edit stock details (e.g., stock name, ticker, quantity, buy
price).
○ A list/table displaying current stock holdings with options to edit or
delete them.


Backend:


● Build the backend using Java with Spring Boot (or Dropwizard) as the
framework.
● Requirements:
○ Expose RESTful APIs to:
■ Add a new stock.
■ Update existing stock details.
■ Delete a stock.
■ Fetch all stocks and calculate the portfolio value.
○ Use JPA and Hibernate for database interactions.
○ Properly handle exceptions and include meaningful HTTP status
codes.


Database:


● Use MySQL (preferred) or any relational database.
● Design a schema to store stock details (e.g., stock name, ticker, quantity, buy
price).
● Include relevant relations if needed (e.g., users and portfolios).


Real-Time Data:


● Integrate with a free stock price API (e.g., Alpha Vantage, Yahoo Finance,
Finnhub).
● Use these prices to calculate the total portfolio value dynamically.
● Pick any 5 stocks randomly for each user and these 5 stocks will constitute
the portfolio of the user.
● For assignment purposes, the quantity of each stock purchased is assumed
to be 1.

