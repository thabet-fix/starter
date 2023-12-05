<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PageLink extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($request)
    {
        $this->link = $request[0];
        $this->email = $request[1];
        $this->contractType =$request[2];
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('SendPageLink')
        ->subject("Invitation contrat")
        ->with([
            'link' => $this->link,
            'email' => $this->email,
            'contractType'=> $this->contractType,
        ]);
    }
}
