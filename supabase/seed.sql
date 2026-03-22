-- Seed: 4 clients + 12 tasks (mix of overdue Pending, In Progress, Completed)
-- Run after schema.sql. Dates assume "today" is after 2025-06-01 for overdue rows.

insert into public.clients (id, company_name, country, entity_type) values
  ('a0000001-0001-4001-8001-000000000001', 'Acme India Pvt Ltd', 'India', 'Private Limited'),
  ('a0000001-0001-4001-8001-000000000002', 'Globex LLP', 'India', 'LLP'),
  ('a0000001-0001-4001-8001-000000000003', 'Nimbus Trading Co', 'Singapore', 'Private Limited'),
  ('a0000001-0001-4001-8001-000000000004', 'Riverfront Services', 'United States', 'LLC')
on conflict (id) do nothing;

insert into public.compliance_tasks (
  id, client_id, title, description, category, due_date, status, priority
) values
  -- Acme (3 tasks)
  (
    'b0000001-0001-4001-8001-000000000001',
    'a0000001-0001-4001-8001-000000000001',
    'GSTR-3B — Q4',
    'File and pay',
    'GST',
    '2025-02-10T00:00:00.000Z',
    'Pending',
    'High'
  ),
  (
    'b0000001-0001-4001-8001-000000000002',
    'a0000001-0001-4001-8001-000000000001',
    'Advance tax installment',
    null,
    'Income Tax',
    '2026-09-15T00:00:00.000Z',
    'In Progress',
    'Medium'
  ),
  (
    'b0000001-0001-4001-8001-000000000003',
    'a0000001-0001-4001-8001-000000000001',
    'DIR-3 KYC',
    'Director KYC',
    'ROC',
    '2024-11-30T00:00:00.000Z',
    'Completed',
    'Low'
  ),
  -- Globex (3 tasks)
  (
    'b0000001-0001-4001-8001-000000000004',
    'a0000001-0001-4001-8001-000000000002',
    'TDS return 24Q',
    null,
    'TDS',
    '2025-01-20T00:00:00.000Z',
    'Pending',
    'High'
  ),
  (
    'b0000001-0001-4001-8001-000000000005',
    'a0000001-0001-4001-8001-000000000002',
    'Form 16 issuance',
    null,
    'Income Tax',
    '2026-05-31T00:00:00.000Z',
    'Pending',
    'Medium'
  ),
  (
    'b0000001-0001-4001-8001-000000000006',
    'a0000001-0001-4001-8001-000000000002',
    'GST annual return',
    null,
    'GST',
    '2025-12-31T00:00:00.000Z',
    'Completed',
    'Medium'
  ),
  -- Nimbus (3 tasks)
  (
    'b0000001-0001-4001-8001-000000000007',
    'a0000001-0001-4001-8001-000000000003',
    'Corporate tax estimate',
    null,
    'Income Tax',
    '2025-03-01T00:00:00.000Z',
    'Pending',
    'Medium'
  ),
  (
    'b0000001-0001-4001-8001-000000000008',
    'a0000001-0001-4001-8001-000000000003',
    'Payroll tax reconciliation',
    null,
    'Payroll',
    '2026-04-30T00:00:00.000Z',
    'In Progress',
    'Low'
  ),
  (
    'b0000001-0001-4001-8001-000000000009',
    'a0000001-0001-4001-8001-000000000003',
    'ROC annual filing',
    null,
    'ROC',
    '2024-10-15T00:00:00.000Z',
    'Completed',
    'High'
  ),
  -- Riverfront (3 tasks)
  (
    'b0000001-0001-4001-8001-000000000010',
    'a0000001-0001-4001-8001-000000000004',
    'Sales tax permit renewal',
    null,
    'Other',
    '2025-04-05T00:00:00.000Z',
    'Pending',
    'High'
  ),
  (
    'b0000001-0001-4001-8001-000000000011',
    'a0000001-0001-4001-8001-000000000004',
    'Quarterly estimated tax',
    null,
    'Income Tax',
    '2026-08-01T00:00:00.000Z',
    'Pending',
    'Medium'
  ),
  (
    'b0000001-0001-4001-8001-000000000012',
    'a0000001-0001-4001-8001-000000000004',
    '941 payroll filing',
    null,
    'Payroll',
    '2025-01-31T00:00:00.000Z',
    'Completed',
    'Low'
  )
on conflict (id) do nothing;
