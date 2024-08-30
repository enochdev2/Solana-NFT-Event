use crate::BuyTicket;
use crate::CustomError;
use anchor_lang::prelude::*;
use anchor_lang::solana_program::{program::invoke, system_instruction};

pub struct TicketManager {}

impl TicketManager {
    pub fn run_buy_ticket(ctx: Context<BuyTicket>, date_of_purchase: i64) -> Result<()> {
        let ticket = &mut ctx.accounts.ticket;
        let event = &ctx.accounts.event;

        if ctx.accounts.organizer.key() != event.organizer {
            return Err(CustomError::CreateTicketInvalidOrganizer.into());
        }

        ticket.event = event.key(); 
        ticket.price = event.ticket_price; 
        ticket.date_of_purchase = date_of_purchase;
        ticket.owner = *ctx.accounts.owner.key;

        ticket.nft_mint = None;

        let lamports = ticket.price;

        invoke(
            &system_instruction::transfer(
                &ctx.accounts.owner.key(),
                &event.organizer, 
                lamports,
            ),
            &[
                ctx.accounts.owner.to_account_info(),
                ctx.accounts.organizer.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
        )?;

        Ok(())
    }
}
