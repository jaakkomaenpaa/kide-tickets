import './../styles/help.css'

const Help = () => {
  return (
    <div className='helpContainer'>
      <h3>Instructions</h3>
      <p>
        In the Event url field, paste the part of the event&lsquo;s url which
        comes after &lsquo;events/&lsquo;. For example from the following url
        &lt;https://kide.app/events/<strong>xxxx-xxxx-xxxx</strong>&gt;, the
        bolded part would be needed.
      </p>
      <p>
        The Bearer token field requires your Kide.app authorization token, which
        can be found anywhere from the Kide.app website by:{' '}
        <strong>
          right-click &rarr; Inspect &rarr; Application &rarr; Local Storage
          &rarr; authorization.token.{' '}
        </strong>
        Make sure to copy the whole token (it is long) and paste it without the
        quotation marks.
      </p>
      <p>
        You can select a ticket index, which means the number of the ticket type
        counted from top to bottom. For example, number 1 corresponds to the
        ticket which is displayed at the top etc. If you choose to select a
        ticket index and it exists, the bot will prioritize that ticket variant.
      </p>
      <p>
        Finally, you can select a keyword, and the bot will prioritize tickets
        that have that word on their title. Both ticket index and keyword
        parameters work as follows: if they are left empty, invalid or
        don&lsquo;t match any ticket variants, the reserver works as default
        (described below). If both are given, the keyword is taken into account
        first.
      </p>
      <p>
        After passing the required info, press &lsquo;Submit&lsquo; and the
        reserver should start working. The status messages of the reservation
        will be shown as a list.
      </p>
      <p>
        The bot will try to reserve the maximum possible amount of each ticket
        type (even if you gave an index and/or a keyword), but it is currently
        capped at 10 tickets per type. The tickets will appear in your Kide.app
        shopping cart after a successful response (sometimes even after an
        unsuccessful response, so you should check the cart anyways).
      </p>
      <p>An access code is required to be able to reserve tickets.</p>
      <p>
        If you have any questions, find any problems, or have some improvement
        ideas, hit me up in Telegram @jaakkomaenpaa
      </p>
    </div>
  )
}

export default Help
