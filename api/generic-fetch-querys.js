export function useGenericFetchQueries(endpoint) {
  const queryClient = useQueryClient();

  const fetchQuery = useQuery({
    queryKey: [endpoint],
    queryFn: () => $fetch(endpoint),
  });

  const createMutation = useMutation({
    mutationFn: (newData) => $fetch(endpoint, { method: "POST", body: newData }),
    onSuccess: () => {
      queryClient.invalidateQueries([endpoint]);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (updatedData) => $fetch(`${endpoint}/${updatedData.id}`, { method: "PUT", body: updatedData }),
    onSuccess: () => {
      queryClient.invalidateQueries([endpoint]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => $fetch(`${endpoint}/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries([endpoint]);
    },
  });

  return { fetchQuery, createMutation, updateMutation, deleteMutation };
}