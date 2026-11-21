<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

- All business data (mode prelaunch/live, contact, services, FAQ, launch checklist) lives in `src/config/business.ts`; null values hide UI. Why: owner edits one place.
- Enquiry forms insert via server functions in `src/lib/enquiries.functions.ts` (zod + honeypot + per-IP hourly limit, admin client); tables have no anon access, staff read via `is_staff()` RLS. Why: no public reads of customer data.
- Service availability, page questions and offer eligibility remain in the central business configuration; original media is mapped separately through asset pointers. Why: keep owner facts consistent without bundling binary media.
- Offer expiry uses the workshop's local calendar date and inclusive final day; web requests never reserve daily promotional places. Why: prevent stale offers and false availability promises.
- Public page metadata uses the shared SEO helper with self-referencing absolute URLs; only the home page declares the business entity. Why: avoid duplicate canonical links and conflicting local-business facts.
