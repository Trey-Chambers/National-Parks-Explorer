'use client'

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { Calendar, GripVertical, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
import { Park } from '@/types/nps'
import { parseStatesList } from '@/lib/utils'
import { US_STATES } from '@/lib/config'

interface ItineraryListProps {
  parks: Park[]
  onRemove: (parkId: string) => void
  onReorder: (startIndex: number, endIndex: number) => void
  startDate?: Date
  endDate?: Date
  onStartDateChange: (date?: Date) => void
  onEndDateChange: (date?: Date) => void
}

export function ItineraryList({
  parks,
  onRemove,
  onReorder,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: ItineraryListProps) {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return
    
    onReorder(result.source.index, result.destination.index)
  }
  
  if (parks.length === 0) {
    return (
      <div className="rounded-md border border-dashed p-8 text-center">
        <h3 className="mb-2 text-lg font-medium">No parks in your itinerary yet</h3>
        <p className="text-sm text-muted-foreground">
          Search for parks and add them to your itinerary to get started.
        </p>
      </div>
    )
  }
  
  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-4">
        <div>
          <div className="mb-2 text-sm font-medium">Start Date</div>
          <DatePicker
            date={startDate}
            onSelect={onStartDateChange}
            placeholder="Select start date"
          />
        </div>
        <div>
          <div className="mb-2 text-sm font-medium">End Date</div>
          <DatePicker
            date={endDate}
            onSelect={onEndDateChange}
            placeholder="Select end date"
            disabled={!startDate}
            fromDate={startDate}
          />
        </div>
      </div>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="parks">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-3"
            >
              {parks.map((park, index) => {
                // Get state names from state codes
                const stateNames = parseStatesList(park.states)
                  .map(code => US_STATES[code as keyof typeof US_STATES] || code)
                  .join(', ')
                
                // Calculate the day number if dates are set
                const dayNumber = startDate && index + 1
                
                return (
                  <Draggable key={park.id} draggableId={park.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="flex items-center rounded-md border bg-card p-3"
                      >
                        <div 
                          {...provided.dragHandleProps}
                          className="mr-3 cursor-grab text-muted-foreground"
                        >
                          <GripVertical className="h-5 w-5" />
                        </div>
                        
                        {dayNumber && (
                          <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                            {dayNumber}
                          </div>
                        )}
                        
                        <div className="flex-1">
                          <h3 className="font-medium">{park.name}</h3>
                          <p className="text-sm text-muted-foreground">{stateNames}</p>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemove(park.id)}
                          className="ml-2 text-muted-foreground hover:text-destructive"
                          aria-label={`Remove ${park.name} from itinerary`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
} 