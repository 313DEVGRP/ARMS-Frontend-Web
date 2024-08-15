import PageHeader from '@/components/PageHeader';
import Widget from '@/components/Widget';

function AuditLogging() {
  return (
    <>
      <PageHeader steps={['System', 'Audit & Logging']} />

      <Widget>
        <Widget.Header title="Audit & Logging" />
        <Widget.Body description="Desc" helpTo="#"></Widget.Body>
      </Widget>
    </>
  );
}

export default AuditLogging;
